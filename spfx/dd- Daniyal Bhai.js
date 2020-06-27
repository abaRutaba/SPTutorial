import { Version } from "@microsoft/sp-core-library";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import "@pnp/sp/fields";

const data: Array<any> = require('./data');

import {
  select,
  selectorAll,
  extent,
  scaleLinear,
  scaleTime,
  scaleSequential,
  interpolateSpectral,
  arc,
  selection,
  path
} from "d3";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./GraphWebPart.module.scss";
import * as strings from "GraphWebPartStrings";
import { override } from "@microsoft/decorators";




export interface IGraphWebPartProps {
  description: string;
  lists: IPropertyPaneDropdownOption[];
  selectedList: string;
  fields: IPropertyPaneDropdownOption[];
  selectedField: string;
}
// export interface IPropertyControlsTestWebPartProps {
//   lists: string | string[]; // Stores the list ID(s)
// }



export default class GraphWebPart extends BaseClientSideWebPart<IGraphWebPartProps> {

  public render(): void {

  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected compute(ddata: Array<any>): Array<any> {
    const size = 73;
    const arr = [];
    for (var i = 0; i < size; i++) {
      var chunk = ddata.slice(i * 5, (i + 1) * 5);
      arr.push({ date: chunk[i % 5].date, high: chunk.reduce((a, c) => (a + c.high), 0) / 5, low: chunk.reduce((a, c) => (a + c.low), 0) / 5 });
    }
    return arr;
  }

  public async loadLists() {
    let data: any = await sp.web.lists.filter('BaseTemplate eq 100 and Hidden eq false').get();
    this.properties.lists = data.map(row => ({ key: row.Id, text: row.Title }));
    this.context.propertyPane.refresh();
  }

  public async loadFields(id: string) {
    let data: any = await sp.web.lists.getById(id).fields.filter('Hidden eq false and ReadOnlyField eq false').get();
    this.properties.fields = data.map(row => ({ key: row.Id, text: row.Title }));
    this.context.propertyPane.refresh();
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === "selectedList") {
      this.loadFields(newValue);
    }
  }

  @override
  public async onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });
    this.loadLists();
    const height: number = 500;
    const highExtent = extent(data, d => d.high);
    const lowExtent = extent(data, d => d.low);
    const dateExtent = extent(data, d => new Date(d.date));
    const scaleY = scaleLinear().domain(highExtent).range([0, height / 2]);
    const scaleYY = scaleLinear().domain(lowExtent).range([0, height / 2]);

    const palette = scaleSequential(interpolateSpectral).domain(highExtent);
    const data2 = this.compute(data);
    const svg: any = select(this.domElement).append('svg')
      .attr('class', styles.graph).attr("width", "100%")
      .attr("height", height).append('g');
    const width = this.domElement.querySelector('svg').width.baseVal.value;

    svg.attr("transform", `translate(${500},${height / 2})`);
    const scaleX = scaleTime().domain(dateExtent).range([0, width]);
    const arcGenerator = arc()
      .innerRadius((d: any) => scaleYY(d.low))
      .outerRadius((d: any) => scaleY(d.high))
      .startAngle((d, i) => (((2 * Math.PI) / 73) * i))
      .endAngle((d, i) => (((2 * Math.PI) / 73) * (i + 1)));

    svg.selectAll('path')
      .data(data2)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('id', (d, i) => (`arc${i}`))
      .attr('fill', d => palette(d.high))
      .attr('class', styles.hover1);
    // .append('text').append('textPath')
    // .attr('xlink-href', (d, i) => (`#arc${i}`))
    // .style("text-anchor", "middle") //place the text halfway on the arc
    // .attr("startOffset", "50%")
    // .text(d => d.date);

    //  .class(styles.hover1)

    //  .fill(palette(d.avg))
    // var data = await sp.web.lists.getByTitle("Customers").items.get();

    // console.log(data);
    let j: HTMLDivElement = document.createElement('div');
    // let data1: any = await sp.web.lists.getById(this.properties.selectedList).get();
    j.innerText = `List ID ${this.properties.selectedList}  Field ID ${this.properties.selectedField}`;
    this.domElement.append(j);
    return Promise.resolve();

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('selectedList', {
                  label: 'Select List',
                  options: this.properties.lists

                }),
                PropertyPaneDropdown('selectedField', {
                  label: 'Select Field',
                  options: this.properties.fields
                }),

                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
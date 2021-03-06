
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneDropdown,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import { sp, Item, ItemAddResult, ItemUpdateResult } from '@pnp/sp';
import {GoogleMapsLoader} from "google-maps";
export interface IHelloWorldWebPartProps {
  description: string;
  description2: string;
  link:string;


}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML =           
        `<h1>Maps</h1>
        <div id="map" style="height:500px">map</div>
        `;
     
     this.loadMap();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private loadMap() :void

  { 
    var beaches = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var GoogleMapsLoader:GoogleMapsLoader = require("google-maps"); 

    GoogleMapsLoader.KEY = "AIzaSyAmxsllnbx_BHiOJCNNp5uOfp59M9AYCuM"; 
    
    GoogleMapsLoader.load(function(google) {          


      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -33.363, lng: 151.044}
    });
  for(var i=0;i<5;i++)
  {
    var marker = new google.maps.Marker({
      position: {lat:beaches[i][1],lng:beaches[i][2]},
      map: map,
      title: 'Hello World!'
    });
  }

    });
   
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        
        {
          
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('description2', {
                  label: "Name"
                }),
                PropertyPaneLink('link', {
                  href: 'https://delucagiuliano.com',
                  text: 'GDL blog',
                  target: '_blank',
                  popupWindowProps: {
                    height: 500,
                    width: 500,
                    positionWindowPosition: 2,
                    title: 'GDL blog'
                  }
              })
              ]

            }
          ]
        },
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneLink('link2', {
                  href: 'https://google.com',
                  text: 'google',
                  target: '_blank',
                  popupWindowProps: {
                    height: 500,
                    width: 500,
                    positionWindowPosition: 2,
                    title: 'Google'
                  }
              }),
              PropertyPaneDropdown('loveOffice365', {
                label: 'DropDown',
                options: [
                  { key: 'Too Much', text: 'Too Much' },
                  { key: 'Not Much', text: 'Not Much' },
                  { key: 'Almost Hate it', text: 'Almost Hate it' },
                  { key: 'Definitely Hate it', text: 'Definitely Hate it' }
                ]}),
                PropertyPaneChoiceGroup('heroes', {
                  label: "choices",
                  options: [
                    { key: 'Hulk', text: 'Hulk' },
                    { key: 'Thor', text: 'Thor' },
                    { key: 'Captain America', text: 'Captain America' },
                    { key: 'Ironman', text: 'Ironman' }
                    ]
                  }
                )
              ]
            }
          ]
        }
       
      ]
    };
  }
}

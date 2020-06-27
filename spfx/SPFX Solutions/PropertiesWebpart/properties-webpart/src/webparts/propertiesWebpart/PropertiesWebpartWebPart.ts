import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp, ItemAddResult, Items } from "sp-pnp-js";
import styles from './PropertiesWebpartWebPart.module.scss';
import * as strings from 'PropertiesWebpartWebPartStrings';


export interface IPropertiesWebpartWebPartProps {
  description: string;
}

export default class PropertiesWebpartWebPart extends BaseClientSideWebPart <IPropertiesWebpartWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<button  id="createButton">
    <span class="${styles.label}">Create item</span>
  </button> <br><br><br>
  <button id="readItem">
    <span>Read item</span>
  </button>
  <br><br><br>
  <button id="updateItem">
    <span>Update item</span>
  </button>
<br><br><br>
<button id="deleteButton">  
   <span>Delete item</span>  
   </button>
   <br><br><br>
  <a href="https://aka.ms/spfx" >
    <span >Learn more</span>
  </a>`;
  this.setButtonsEventHandlers();
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
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
              })
            ]
          }
        ]
      }
    ]
  };
}

private setButtonsEventHandlers(): void {
    const webPart: PropertiesWebpartWebPart = this;
    this.domElement.querySelector('#createButton').addEventListener('click', this.createItem);
    this.domElement.querySelector('#readItem').addEventListener('click', this.readItem);
    this.domElement.querySelector('#updateItem').addEventListener('click', webPart.updateItem);
    this.domElement.querySelector('#deleteButton').addEventListener('click', webPart.deleteItem);
  }
  public createItem():void 
  {
    sp.web.lists.getByTitle("Students").items.add({
      Title: "hello"
    }).then((iar: ItemAddResult) => {
      console.log(iar);
    })
  }  

  private readItem():void{    
      // get a specific item by id
      sp.web.lists.getByTitle("Students").items.getById(1).get().then((item: any) => {
        console.log(item);
      })
     
    }

    private updateItem():void{   
        let list = sp.web.lists.getByTitle("Students");
        list.items.getById(4).update({
            Title: "My New Title - SPFx0000"
            
        }).then(i => {
            console.log("ok",i);
        }); 
      }
      
private deleteItem():void{  
    let list = sp.web.lists.getByTitle("Students");
    list.items.getById(1).delete().then(_ => {console.log('List Item Deleted')});  
  } 
}

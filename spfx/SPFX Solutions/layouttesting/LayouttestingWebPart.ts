import { sp, ItemAddResult, Items } from "@pnp/sp";
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
 

  
} from '@microsoft/sp-webpart-base';
import {
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,

} from '@microsoft/sp-property-pane';
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './LayouttestingWebPart.module.scss';
import * as strings from 'LayouttestingWebPartStrings';
export interface ILayouttestingWebPartProps {
  description: string;
  test: string;
    test1: boolean;
    test2: string;
    size: string;
    test3: boolean;
    fileType:string;
}

SPComponentLoader.loadCss(require("./assets/css/calender.css"));

const CalenderViewicon: string = require('./assets/icons8-planner-64.png'); 
const Listviewicon: string = require('./assets/Listview.png'); 
const Boxviewicon: string = require('./assets/boxview.png'); 
export default class LayouttestingWebPart extends BaseClientSideWebPart<ILayouttestingWebPartProps> {


  public render(): void {
   
  
   // this.itemaddinlist();
      if(this.properties.fileType == "Listview"){

         this.listview();

      }
      if(this.properties.fileType == "BoxView"){

        this.boxview();

     }
     if(this.properties.fileType == "TableView"){

      this.TableView();

   }
   
  }
  /**
   * item add
   */
  public itemaddinlist() {
    // add an item to the list
    sp.web.lists.getByTitle("Students").items.add({
      Title: "PnPJS222"
     
    }).then((iar: ItemAddResult) => {
      console.log(iar);
    });
  }
/**
 * listview
 */
public listview() {
  
 let listviewwebpart = `
 
      <div class="${ styles.layouttesting }">
        <div class="${escape(this.properties.size)}">
          <div class="${escape(this.properties.test2)}">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint Listview !</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.test)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }" >
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
      this.domElement.innerHTML = listviewwebpart;
      
	
}
public boxview() {
  let boxvieWwebpart = `
       <div class="${ styles.layouttesting }">
         <div class="${escape(this.properties.size)}">
           <div class="${escape(this.properties.test2)}">
             <div class="${ styles.column }">
               <span class="${ styles.title }">Welcome to SharePoint Box View !</span>
               <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
               <p class="${ styles.description }">${escape(this.properties.test)}</p>
               <a href="https://aka.ms/spfx" class="${ styles.button }" >
                 <span class="${ styles.label }">Learn more</span>
               </a>
             </div>
           </div>
         </div>
       </div><div class="${ styles.layouttesting }">
       <div class="${escape(this.properties.size)}">
         <div class="${escape(this.properties.test2)}">
           <div class="${ styles.column }">
             <span class="${ styles.title }">Welcome to SharePoint Box View !</span>
             <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
             <p class="${ styles.description }">${escape(this.properties.test)}</p>
             <a href="https://aka.ms/spfx" class="${ styles.button }" >
               <span class="${ styles.label }">Learn more</span>
             </a>
           </div>
         </div>
       </div>
     </div><div class="${ styles.layouttesting }">
     <div class="${escape(this.properties.size)}">
       <div class="${escape(this.properties.test2)}">
         <div class="${ styles.column }">
           <span class="${ styles.title }">Welcome to SharePoint Box View !</span>
           <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
           <p class="${ styles.description }">${escape(this.properties.test)}</p>
           <a href="https://aka.ms/spfx" class="${ styles.button }" >
             <span class="${ styles.label }">Learn more</span>
           </a>
         </div>
       </div>
     </div>
   </div>`;
       this.domElement.innerHTML = boxvieWwebpart;
 }
 public TableView() {
  var events2=[]	
  sp.web.lists.getByTitle("calenderlistevent").items.select("*,EventType/Title,EventType/color").expand("EventType").get().then(items=>{

items.forEach(function(e){
		
	var obj =	{
					title: e.Title,
          start: new Date(e.Startdate),
          end:new Date(e.Enddate),
					detail: e.Description,
					extendedProps: {
                        backgroundColor: e.EventType.color,
                        date: new Date(e.Startdate).toDateString().split(" ")[2],
                        day: new Date(e.Startdate).toDateString().split(" ")[0],
                        month: new Date(e.Startdate).toDateString().split(" ")[1]+","+new Date(e.Startdate).toDateString().split(" ")[3]
					},
					backgroundColor: e.EventType.color,
					borderColor: e.EventType.color //'#09a5e7'
				}
		events2.push(obj);
		});
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: new Date(),
      defaultView: 'month',
      editable: false,
      eventClick: function(info) {
      
        $('.my-calender').addClass('open');
        $('.my-calender').prepend('<div class="my-calender--overlay"></div>');
 
                var html = '<a href="#" class="my-calender--popup-btn-close"><em class="fa fa-times"></em></a>' +
                           ' <h2 class="h2"><span>'+ info.title +'</span></h2>'+
                           ' <div class="wrap">'+
                            '<div class="my-calender--dater" style="background-color:'+info.extendedProps.backgroundColor+' !important;">' +
                                '<span class="mcd--date">'+ info.extendedProps.date +'</span>'+
                                '<span class="mcd--day">'+ info.extendedProps.day+'</span>'+
                                '<span class="mcd--month-year">'+ info.extendedProps.month+'</span>'+
                            '</div>'+
                            info.detail +                            
                        '</div>';
 
                $('.my-calender--popup').html(html);
                
               
 
 
 
      },
      events: events2,
      eventOverlap: function(stillEvent, movingEvent) {
        return stillEvent.allDay && movingEvent.allDay;
      }
        });
  });

  let TableViewwebpart = `<div style="max-width:700px;"><div class="my-calender">
  <link type="text/css" rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.css" />
  <div id="calendar"></div>
</div>
     </div></div>
     
     `;
       this.domElement.innerHTML = TableViewwebpart;
      
       $('.my-calender').prepend('<div class="my-calender--popup"></div>');

       $('body').on('click','.my-calender--popup-btn-close,.my-calender--overlay',function(e){
     $(this).closest('.my-calender').removeClass('open');
           $('.my-calender--overlay').remove();
       });
       
      
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
                label: 'Description'
              }),
              PropertyPaneChoiceGroup('fileType', {
                label: "fileType",
                options: [
                  { key: 'TableView', text: 'Event Calender View',
                    imageSrc: CalenderViewicon,
                    imageSize: { width: 32, height: 32 },
                    selectedImageSrc: CalenderViewicon
                  },
                  { key: 'Listview', text: 'List view',
                    imageSrc: Listviewicon,
                    imageSize: { width: 32, height: 32 },
                    selectedImageSrc: Listviewicon
                  },
                  { key: 'BoxView', text: 'Box View',
                    imageSrc: Boxviewicon,
                    imageSize: { width: 32, height: 32 },
                    selectedImageSrc: Boxviewicon
                  }
                ]
              }),
              PropertyPaneTextField('test', {
                label: 'Multi-line Text Field',
                multiline: true
              }),
              
              PropertyPaneDropdown('test2', {
                label: 'Change Background',
                options: [
                  { key: styles.row2, text: 'One' },
                  { key: styles.row, text: 'Two' },
                  { key: styles.row3, text: 'three' }
                  
                ]}),
                PropertyPaneDropdown('size', {
                  label: 'Change size',
                  options: [
                    { key: styles.container, text: '2.x' },
                    { key: styles.container2, text: '1.x' }
                    
                  ]}),
              PropertyPaneToggle('test3', {
                label: 'Toggle',
                onText: 'On',
                offText: 'Off'
              }),
              

              
            
            ]            
            }
          ]
        }
      ]
    };
  }
}

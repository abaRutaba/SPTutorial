import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp, List, Item, ItemAddResult, ItemUpdateResult } from 'sp-pnp-js';
import * as strings from 'LayoutsWebpartRutabaWebPartStrings';
import {
  PropertyPaneChoiceGroup,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneDropdown,
  
} from '@microsoft/sp-property-pane';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { SPComponentLoader } from"@microsoft/sp-loader";
SPComponentLoader.loadCss(require("./assets/css/bootstrap.css"));
SPComponentLoader.loadCss(require("./assets/css/style.min.css"));

var dataResult : boolean=true;
var Pagination : number = 2;
var PObject : any;
const user: string = require('./assets/images/user.png');
const mail: string = require('./assets/images/email.png');
const phone: string = require('./assets/images/phone.png');
const serach: string = require('./assets/images/search.png');


export interface ILayoutsWebpartRutabaWebPartProps {
  description: string;
  fileType: string;
  Form:boolean;
  color:any;
  maxEmp:any;
  filter:any;
  Order:any;
  Name:any;
  Email:string;
  Phone:string;
  Img:string;
  Skills:string;
  Position:string;
  ID:any;
  btn1:any;
  UID:any;
  UName:string;
  USKills:string;
  UImg:any;
  UPosition:string;
  UEmail:string;
  UPhoneNumber:string;
}

export default class LayoutsWebpartRutabaWebPart extends BaseClientSideWebPart <ILayoutsWebpartRutabaWebPartProps> {

  public render(): void {
    if(dataResult)
    this.loadPage();
    

    
    //this.domElement.innerHTML = ;
      this.EmpData();

      this.ColorChnange();
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}
public EmpData()
{
  if(this.properties.fileType == "BoxView")
  {
    this.BoxView();
  }
  if(this.properties.fileType == "ListView")
  {
    this.ListView();
  }
  if(this.properties.fileType == "SearchView")
  {
    this.SearchView();
  }
}
public ListView()
{
  let listHTML="", finalListHTML="";
  let count:number=0;
  
  sp.web.lists.getByTitle("Users").items.orderBy(this.properties.filter,true).get().then((item: any) => {
    console.log(item);
    
    item.forEach(element => {
      count++;
      if(count<=this.properties.maxEmp)
      {
      listHTML += '<tr>'+
      '<td>'+element.Title+'</td>'+
      '<td>'+ element.Email +'</td>'+
      '<td>'+ element.Phone +'</td>'+
      '<td><img src="'+ element.Img.Url +'"  alt="employee" style="height:50px;width:50px;"></td>'+
      '<td>'+element.Skills+'</td>'+
      '<td>'+ element.Position +'</td>'+
   '</tr> ';
   console.log(listHTML);
      }
    });
  finalListHTML =`
  <div class="app-hedding">
  <h2>${escape(this.properties.description)}</h2>
</div>
<br><br>
  <table style="font-family: arial, sans-serif;border-collapse: collapse;width: 100%;">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Image</th>
    <th>Skills</th>
    <th>Position</th>
  </tr>
  `+listHTML;
  this.domElement.innerHTML='';
  this.domElement.innerHTML = finalListHTML;
});
}
public SearchView()
{
    let usersHTML = "";      
    let count:number=0; 
          sp.web.lists.getByTitle("Users").items.orderBy(this.properties.filter,true).get().then((item: any) => {
              console.log(item);
              item.forEach(element => {
                count++;
                if(count<=this.properties.maxEmp)
                {
                  usersHTML += '<li>'+
                  '<div class="tab-item-inn-emp d-flex">'+
                      '<img src="'+ element.Img.Url +'"  alt="employee" class="employeeImg">'+
                      '<div class="content-wrap-emp">'+
                          '<span>'+element.Title+'</span>'+
                          '<a href="#" mailTo="'+ element.Email +'">'+element.Email+'</a>'+
                          '<p>'+element.Phone+'</p>'+
                      '</div>'+
                  '</div>'+
              '</li> ';
              console.log(usersHTML);
                }   
              });
              var FinalHTML = `<main class="mt-4">
    <div class="container">

        <div class="row row-eq-height ">
         
     
            <div class="col-12 col-sm-6 col-md-6 col-lg-7 mobile-margin mt-4">
                <div class="myTask-wrapper border-radius">
                    <div class="app-hedding">
                        <h2>${escape(this.properties.description)}</h2>
                    </div>
                    <form action="" class="formsearch">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search ..." aria-label="Search ..." aria-describedby="basic-addon2">
                        </div>
                    </form>
                    <div class="list-employee">
                        <ul class="inner-tab-view-emp">
                        `+usersHTML+`
                        </ul>
                    </div>
                    <div class="veiwmore mt-auto">
                        <a href="#">see all </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main> `;
console.log("usersHTML ",usersHTML);
             // document.getElementById("empList").innerHTML = usersHTML;
             this.domElement.innerHTML='';
             this.domElement.innerHTML = FinalHTML;
          });
    
}
public BoxView()
{
  var EmpBoxHTML = "",BoxFinalHTML="";
  let Order:boolean=true;
  let count:number=0;
if(this.properties.Order == "asc")
{
  Order = true;
}
else
{
  Order = false;
}


  sp.web.lists.getByTitle("Users").items.orderBy(this.properties.filter,true).get().then((item: any) => {
    console.log("Box View ",item);
    
    item.forEach(element => {
      count++;
      if(count<=this.properties.maxEmp)
      {
   EmpBoxHTML += '<div class="col-12 col-sm-6 col-lg-4 mb-3">'+
   '<div class="border-radius employee-cards">'+
     '<div class="tab-item-inn-emp d-flex">'+
         '<img src="'+ element.Img.Url +'"  alt="employee" class="employeeImg">'+
         '<div class="content-wrap-emp">'+
             '<span>'+element.Title+'</span>'+
             '<p class="mangmnt">'+element.Position+'</p>'+
             '<p class="skill">Skills: '+element.Skills+'</p>'+
             '<a href="#" mailto="'+element.Email+'">'+element.Email+'</a>'+
             '<p>'+element.Phone+'</p>'+
         '</div>'+
     '</div>'+
   '</div>'+
'</div>';
      }
   console.log(EmpBoxHTML);
    });
    BoxFinalHTML = `<main class="innert-content-main">
    <div class="Department-inner">
        <div class="right-Content-Inner mb-4">
          <div class="container">
           <div class="col-12">
                <div class="inner-content-page">
                <div class="app-hedding">
                        <h2>${escape(this.properties.description)}</h2>
                    </div>
                    <div class="row">
                    `+EmpBoxHTML+`
                  </div>
                </div>
            </div>
           </div>
        </div>
    </div>
  </main>`;
  this.domElement.innerHTML='';
  this.domElement.innerHTML = BoxFinalHTML;

  });
}
public ColorChnange()
{
  if(this.properties.color)
  {
    this.domElement.style.backgroundColor = this.properties.color;

  }

  
}
public AddEmp()
{

  debugger;
  console.log("this.properties.Name = ",this.properties.Name);
  debugger
  sp.web.lists.getByTitle("Users").items.add({
    Title: this.properties.Name,
    Email: this.properties.Email,
    Phone: this.properties.Phone,
    Img: this.properties.UImg,
    Skills: this.properties.Skills,
    Position: this.properties.Position   
  }).then((iar: ItemAddResult) => {
      alert("You Added a record!");
  });
}
public DelEmp()
{
  debugger
  let id:number;
  id= Number(this.properties.ID);
  debugger;
  let list = sp.web.lists.getByTitle("Users");
  list.items.getById(id).delete().then(_ => {alert('Employee Deleted!')});  
}
public update()
  {
    debugger
    let id2:number;
    id2= Number(this.properties.UID);
    let list = sp.web.lists.getByTitle("Users");
    list.items.getById(id2).update({
        Title: this.properties.UName,
        Email: this.properties.UEmail,
        Phone: this.properties.UPhoneNumber,
        Img: this.properties.UImg,
        Skills: this.properties.USKills,
        Position: this.properties.UPosition
          }).then(i => {
        alert("Updated");
    });
  }

validateName(name:string):string
{
  // if(typeof name!===string)
  if (name === null ||
    name.trim().length === 0) {
    return 'Provide a name';
  }

  if (name.length > 40) {
    return 'Name should not be longer than 40 characters';
  }

  return "";
}
validatePhone(phone:string):string
{
  // if(typeof name!===string)
  if (phone === null ||
    phone.trim().length === 0) {
    return 'Provide a phone';
  }

  if (phone.length > 40) {
    return 'phone should not be longer than 40 characters';
  }

  return "";
}
validateEmail(email:string):string
{
  
  // if(typeof name!===string)
  if (email === null ||
    email.trim().length === 0) {
    return 'Provide a email';
  }

  if (email.length > 40) {
    return 'email should not be longer than 40 characters';
  }

  return "";
}
validateSkills(skills:string):string
{
  // if(typeof name!===string)
  if (skills.trim().length === 0) {
    return 'Provide a skills';
  }

  if (skills.length > 40) {
    return 'skills should not be longer than 40 characters';
  }

  return "";
}
validatePosition(position:string):string
{
  // if(typeof name!===string)
  if (position === null ||
    position.trim().length === 0) {
    return 'Provide a name';
  }

  if (position.length > 40) {
    return 'position should not be longer than 40 characters';
  }

  return "";
}
public loadmore()
{
  if (PObject.hasNext) {
   // dataResult=true;
    PObject.getNext().then(p2 => {
  debugger;
  console.log(p2);
  PObject=p2;
          console.log(JSON.stringify(p2.results, null, 4));
      });
  }
}
public loadPage()
{
  
      sp.web.lists.getByTitle("Users").items.select("Title").top(2).getPaged()
      .then(p => {
         debugger;
         console.log(JSON.stringify(p.results, null, 4));
         //Pagination+2;
        PObject=p;
        dataResult=false;
    });
  
}
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description:"Employee Directory"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Beautify",
            isCollapsed: false,
            groupFields: [
              PropertyPaneButton('btn1', {
                text: "Load more",
                buttonType: PropertyPaneButtonType.Primary,
                onClick:this.loadmore.bind(this)                
               }),
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              }),
              PropertyFieldColorPicker('color', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Full,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneChoiceGroup('fileType', {
                label: "Select View",
                options: [
                  { key: 'BoxView', text: 'Box View',
                    imageSrc: "",
                    imageSize: { width: 40, height: 40 },
                    selectedImageSrc: ""
                  },
                  { key: 'ListView', text: 'List view',
                    imageSrc: "",
                    imageSize: { width: 40, height: 40 },
                    selectedImageSrc: ""
                  },
                  { key: 'SearchView', text: 'Search View',
                    imageSrc: "",
                    imageSize: { width: 40, height: 40 },
                    selectedImageSrc: ""
                  }
                ]
              }),
              PropertyPaneSlider('maxEmp', { 
                label: 'Max results', 
                min: 1, 
                max: 5, 
                step: 1, 
                showValue: true, 
                value: 10 
              }),
              // PropertyPaneDropdown('Order', {
              //   label:'Select Order',
              //   options: [
              //     { key: 'asc', text: 'Ascending' },
              //     { key: 'desc', text: 'Descending' }
              //   ]
              // }),
              PropertyPaneDropdown('filter', {
                label:'Select Filter',
                options: [
                  { key: 'ID', text: 'ID' },
                  { key: 'Title', text: 'Name' }
                ]
              })
            ]
            
          },                    
        ]

      },
      {
        header: {
          description: "CRUD Operations"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Add Employee",
            isCollapsed: true,
            groupFields: [
              PropertyPaneTextField('Name', {
                label: "Employee Name",
                onGetErrorMessage: this.validateName.bind(this)
              }),
              PropertyPaneTextField('Email', {
                label: "Email",
                onGetErrorMessage: this.validateEmail.bind(this)
              }),
              PropertyPaneTextField('Phone', {
                label: "Phone Number",
                onGetErrorMessage: this.validatePhone.bind(this)
              }),
              PropertyPaneTextField('Img', {
                label: "Image"
              }),
              PropertyPaneTextField('Skills', {
                label: "Skills",
                onGetErrorMessage: this.validateSkills.bind(this)
              }),
              PropertyPaneTextField('Position', {
                label: "Position",
                onGetErrorMessage: this.validatePosition.bind(this)
              }),
              PropertyPaneButton('btn1', {
                text: "Save",
                buttonType: PropertyPaneButtonType.Primary,
                //onClick: this.AddEmp,
                onClick:this.AddEmp.bind(this)

                
               })
            ]
            
          }, 
          {
            groupName: "Delete Employee",
            isCollapsed: true,
            groupFields: [
              PropertyPaneTextField('ID', {
                label: "Employee ID",
              }),
              PropertyPaneButton('btn', {
                text: "Delete",
                buttonType: PropertyPaneButtonType.Primary,
                onClick: this.DelEmp.bind(this),
               //this.ButtonClick.bind(this)
               })
            ]
            
          }, 
          {
            groupName: "Update Employee",
            isCollapsed: true,
            groupFields: [
              PropertyPaneTextField('UID', {
                label: "Employee ID",
              }),
              PropertyPaneTextField('UName', {
                label: "Employee Name",
              }),
              PropertyPaneTextField('USKills', {
                label: "Employee SKills",
              }),
              PropertyPaneTextField('UImg', {
                label: "Employee Img",
              }),
              // FilePicker('h',{
              //   label:"",
              //   text:""
              // }),
              PropertyPaneTextField('UPosition', {
                label: "Employee Position",
              }),
              PropertyPaneTextField('UEmail', {
                label: "Employee Email",
              }),
              PropertyPaneTextField('UPhoneNumber', {
                label: "Employee Phone Number",
              }),
              
              PropertyPaneButton('btn', {
                text: "Update",
                buttonType: PropertyPaneButtonType.Primary,
                onClick: this.update.bind(this),
               })
            ]
            
          }, 

        ]
        

      }
    ]
  };
}
}

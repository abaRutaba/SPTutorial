import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SiteScriptWebPart.module.scss';
import * as strings from 'SiteScriptWebPartStrings';

export interface ISiteScriptWebPartProps {
  description: string;
}

export default class SiteScriptWebPart extends BaseClientSideWebPart <ISiteScriptWebPartProps> {
  public AppSiteDesign(ScriptID, WebUrl)
  {
    this.RestRequest("/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.ApplySiteDesign", {siteDesignId: "614f9b28-3e85-4ec9-a961-5971ea086cca", "webUrl":"https://contoso.sharepoint.com/sites/projectgo"});
  }
  public SiteDesignScript(ScriptID)
  {
    this.RestRequest("/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.CreateSiteDesign",{
      info:{
        Title:"Contoso customer tracking",
        Description:"Creates customer list and applies standard theme",
        SiteScriptIds:ScriptID,//["07702c07-0485-426f-b710-4704241caad9"],
        WebTemplate:"64",
        PreviewImageUrl: "https://contoso.sharepoint.com/SiteAssets/contoso-design.png",
        PreviewImageAltText: "Customer tracking site design theme"
        }
      });
  }
  public RestRequest(url,params) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function ()
    {
      if (req.readyState != 4) // Loaded
        return;
      console.log(req.responseText);
    };
  
    // Prepend web URL to url and remove duplicated slashes.
   // var webBasedUrl = (_spPageContextInfo.webServerRelativeUrl + "//" + url).replace(/\/{2,}/,"/");
   var webBasedUrl = (this.context.pageContext.legacyPageContext['webServerRelativeUrl'] + "//" + url).replace(/\/{2,}/,"/");
    req.open("POST",webBasedUrl,true);
    req.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    req.setRequestHeader("ACCEPT", "application/json; odata.metadata=minimal");
    req.setRequestHeader("x-requestdigest", this.context.pageContext.legacyPageContext['formDigestValue']);
    req.setRequestHeader("ODATA-VERSION","4.0");
    req.send(params ? JSON.stringify(params) : void 0);
  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.siteScript }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
    <p class="${ styles.description }">${escape(this.properties.description)}</p>
      <a href="https://aka.ms/spfx" class="${ styles.button }">
        <span class="${ styles.label }">Learn more</span>
          </a>
          </div>
          </div>
          </div>
          </div>`;
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
}

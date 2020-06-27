import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './WeatherWebPart.module.scss';
import * as strings from 'WeatherWebPartStrings';
export interface IWeatherWebPartProps {
  description: string;
}
 import weather from 'openweather-apis';
import "./weather.css";
export default class WeatherWebPart extends BaseClientSideWebPart <IWeatherWebPartProps> {
   CURRENT_LOCATION : any;
   CURRENT_TEMP : any;
   FORECAST :any;
  
   appid:string = 'e43f64ee98be9268f7a7f49e34aecfdf'; // use your own API KEY plz
  
  public render(): void {


    this.domElement.innerHTML = `<div class="component__weather-box">
    <div class="component__weather-content">
      <div class="weather-content__overview"></div>
      <div class="weather-content__temp"></div>
    </div>
    <div class="component__forecast-box"></div>
  </div>
  `;
  this.CURRENT_LOCATION = document.getElementsByClassName('weather-content__overview')[0];
  this.CURRENT_TEMP  = document.getElementsByClassName('weather-content__temp')[0];
  this.FORECAST  = document.getElementsByClassName('component__forecast-box')[0];
    
   this.draw();
  }
  draw()
  {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        // run/render the widget data
        this.getWeatherData(coordinates).then(weatherData => {
          const city = weatherData.city;
          const dailyForecast = weatherData.list;
    
          this.renderData(city, dailyForecast);
        });
      }, e => console.log(e));
    } else {
      console.log('unable to retrieve location from browser')
    }
  }

// Use Fetch API to GET data from OpenWeather API
getWeatherData(position) {
  const headers = new Headers();
  const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?${position}&cnt=7&units=imperial&APPID=${this.appid}`;

  return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(data => data.json());
}

/* TUTORIAL READERS:
** I am using an external resource for the icons and applying them 
** here using a switch block; check the sidebar "Resources" to get
** the css if you want to use these icons
*/
applyIcon(icon) {
  let selectedIcon;
  switch (icon) {
    case '01d':
      selectedIcon = "wi-day-sunny"
      break;
    case '01n':
      selectedIcon = "wi-night-clear"
      break;
    case '02d':
    case '02n':
      selectedIcon = "wi-cloudy"
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      selectedIcon = "wi-night-cloudy"
      break;
    case '09d':
    case '09n':
      selectedIcon = "wi-showers"
      break;
    case '10d':
    case '10n':
      selectedIcon = "wi-rain"
      break;
    case '11d':
    case '11n':
      selectedIcon = "wi-thunderstorm"
      break;
    case '13d':
    case '13n':
      selectedIcon = "wi-snow"
      break;
    case '50d':
    case '50n':
      selectedIcon = "wi-fog"
      break;
    default:
      selectedIcon = "wi-meteor"
  }
  return selectedIcon;
}

// Use returned json from promise to render daily forecast
renderData = (location, forecast) => {
  debugger;
  // render city, current weather description and temp
  const currentWeather = forecast[0].weather[0];
  const widgetHeader = `<h1>${location.name}</h1><small>${currentWeather.description}</small>`;
  console.log(forecast[0].temp.day)
  this.CURRENT_TEMP.innerHTML = `<i class="wi ${this.applyIcon(currentWeather.icon)}"></i> ${Math.round(forecast[0].temp.day)} <i class="wi wi-degrees"></i>`;
  this.CURRENT_LOCATION.innerHTML = widgetHeader;

// render each daily forecast
  forecast.forEach(day => {
    let date = new Date(day.dt * 1000);
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    let name = days[date.getDay()];
    let dayBlock = document.createElement("div");
    console.log(day)
    dayBlock.className = 'forecast__item';
    dayBlock.innerHTML = `<div class="forecast-item__heading">${name}</div>
      <div class="forecast-item__info"><i class="wi ${this.applyIcon(day.weather[0].icon)}"></i> <span class="degrees">${Math.round(day.temp.day)}<i class="wi wi-degrees"></i></span></div>`;
this.FORECAST.appendChild(dayBlock);
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
              })
            ]
          }
        ]
      }
    ]
  };
}
}

import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {WEATHER_ITEMS} from "./weather-item.data";
import {WeatherItem} from "./weather-item.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class WeatherItemService {

  constructor(private _http:Http) { }

  getWeatherItems(){
    return WEATHER_ITEMS;
  }

  addWeatherItem(weatherItem:WeatherItem){
    WEATHER_ITEMS.push(weatherItem);
  }

  searchWeatherData(cityName:string):Observable<any>{
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q='
      + cityName + '&APPID=333832463775da01661757d6fcc7fa63&units=metric')
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

}

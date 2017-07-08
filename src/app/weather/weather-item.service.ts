import {Injectable} from '@angular/core';
import {Http, Response, Request} from "@angular/http";
import {WEATHER_ITEMS} from "./weather-item.data";
import {WeatherItem} from "./weather-item.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class WeatherItemService {

  constructor(private _http:Http) {
  }

  getWeatherItems() {
    return WEATHER_ITEMS;
  }

  addWeatherItem(weatherItem:WeatherItem) {
    WEATHER_ITEMS.push(weatherItem);
  }

  searchWeatherData(cityName:string):Observable<any> {
    console.log(cityName);
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q='
      + cityName + '&APPID=333832463775da01661757d6fcc7fa63&units=metric')
      .map(res => res.json())
      .catch(this._handleError);
  }

  cleanWeatherData(){
    WEATHER_ITEMS.splice(0);
  }

  private _handleError(err:any) {
    console.log('sever error:', err.json());  // debug
    if (err instanceof Response) {
      return Observable.empty();
      //return Observable.throw(err.json().error || 'backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      //return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.empty();
    //return Observable.throw(err || 'backend server error');
  }

}

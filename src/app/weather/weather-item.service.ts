import { Injectable } from '@angular/core';
import {WEATHER_ITEMS} from "./weather-item.data";

@Injectable()
export class WeatherItemService {

  constructor() { }

  getWeatherItems(){
    return WEATHER_ITEMS;
  }

}

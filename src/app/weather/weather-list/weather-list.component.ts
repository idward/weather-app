import { Component, OnInit } from '@angular/core';
import {WeatherItem} from "../weather-item.model";
import {WeatherItemService} from "../weather-item.service";

@Component({
  selector: 'weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})

export class WeatherListComponent implements OnInit {
  weatherItems:WeatherItem[];

  constructor(private _weatherItemService:WeatherItemService) { }

  ngOnInit():any {
    this.weatherItems = this._weatherItemService.getWeatherItems();
    // console.log(this.weatherItems);
  }

}

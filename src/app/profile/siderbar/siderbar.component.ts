import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../profile.service";
import {Profile} from "../profile.model";
import {WeatherItemService} from "../../weather/weather-item.service";
import {WeatherItem} from "../../weather/weather-item.model";

@Component({
  selector: 'siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss'],
  providers: [ProfileService]
})

export class SiderbarComponent implements OnInit {
  profiles:Profile[];

  constructor(private _profileService:ProfileService, private _weatherItemService:WeatherItemService) {
  }

  ngOnInit() {
    this.profiles = this._profileService.getProfiles();
  }

  loadProfile(profile:Profile) {
    this._weatherItemService.cleanWeatherData();
    let cities = profile.cities;
    for (let i = 0; i < cities.length; i++) {
      this._weatherItemService.searchWeatherData(cities[i])
        .retry()
        .subscribe(
          data => {
            let weatherItem = new WeatherItem(data.name, data.weather[0].main, data.main.temp);
            this._weatherItemService.addWeatherItem(weatherItem);
          }
        );
    }
  }

  onDeleteProfile(event:Event,profile:Profile) {
    console.log(event);
    event.stopPropagation();
    this._profileService.deleteProfile(profile);
  }

  onSaveNew() {
    let weatherItems = this._weatherItemService.getWeatherItems();
    let cities = weatherItems.map(weatherItem => weatherItem.cityName);
    this._profileService.saveProfile(cities);
  }

}

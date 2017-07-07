import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherItemService} from "../weather-item.service";
import {WeatherItem} from "../weather-item.model";

@Component({
  selector: 'weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  form:FormGroup;

  constructor(@Inject(FormBuilder) fb:FormBuilder, private _weatherItemService:WeatherItemService) {
    this.form = fb.group({
      city: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this._weatherItemService.searchWeatherData(this.form.value.city)
      .subscribe(
        data => {
          console.log(data);
          let weatherItem = new WeatherItem(data.name, data.weather[0].main, data.main.temp);
          this._weatherItemService.addWeatherItem(weatherItem);
        },
        err => console.log(err),
        () => console.log('Done!')
      );
  }

}

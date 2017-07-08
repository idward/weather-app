import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherItemService} from "../weather-item.service";
import {WeatherItem} from "../weather-item.model";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  form:FormGroup;
  private searchStream = new Subject<string>();
  data:any;

  constructor(@Inject(FormBuilder) fb:FormBuilder, private _weatherItemService:WeatherItemService) {
    this.form = fb.group({
      city: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.searchStream
      .debounceTime(800)
      .distinctUntilChanged()
      .switchMap((input:string) => this._weatherItemService.searchWeatherData(input))
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        }
      );
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

  onSearchLocation(cityName:string) {
    this.searchStream.next(cityName);
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  form:FormGroup;

  constructor(@Inject(FormBuilder) fb:FormBuilder) {
    this.form = fb.group({
      city: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);
  }

}

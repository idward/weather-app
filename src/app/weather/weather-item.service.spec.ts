import { TestBed, inject } from '@angular/core/testing';

import { WeatherItemService } from './weather-item.service';

describe('WeatherItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherItemService]
    });
  });

  it('should be created', inject([WeatherItemService], (service: WeatherItemService) => {
    expect(service).toBeTruthy();
  }));
});

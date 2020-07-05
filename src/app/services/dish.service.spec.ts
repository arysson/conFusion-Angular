import { TestBed, inject } from '@angular/core/testing';

import { DishService } from './dish.service';
import { HttpClientModule } from '@angular/common/http';

describe('DishService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      DishService
    ]
  }));

  it('should be created', inject([DishService], (service: DishService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { HttpClientModule } from '@angular/common/http';

describe('FavoriteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      FavoriteService
    ]
  }));

  it('should be created', inject([FavoriteService], (service: FavoriteService) => {
    expect(service).toBeTruthy();
  }));
});

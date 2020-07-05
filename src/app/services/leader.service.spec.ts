import { TestBed, inject } from '@angular/core/testing';

import { LeaderService } from './leader.service';
import { HttpClientModule } from '@angular/common/http';

describe('LeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      LeaderService
    ]
  }));

  it('should be created', inject([LeaderService], (service: LeaderService) => {
    expect(service).toBeTruthy();
  }));
});

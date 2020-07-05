import { TestBed, inject } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';
import { HttpClientModule } from '@angular/common/http';

describe('FeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      FeedbackService
    ]
  }));

  it('should be created', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));
});

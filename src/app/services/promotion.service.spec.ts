import { TestBed, inject } from '@angular/core/testing';

import { PromotionService } from './promotion.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

describe('PromotionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [
      PromotionService
    ]
  }));

  it('should be created', inject([PromotionService], (service: PromotionService) => {
    expect(service).toBeTruthy();
  }));
});

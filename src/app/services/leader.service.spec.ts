import { TestBed, inject } from '@angular/core/testing';

import { LeaderService } from './leader.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

describe('LeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [
      LeaderService
    ]
  }));

  it('should be created', inject([LeaderService], (service: LeaderService) => {
    expect(service).toBeTruthy();
  }));
});

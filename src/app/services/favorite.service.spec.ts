import { TestBed, inject } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('FavoriteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule
    ],
    providers: [
      FavoriteService
    ]
  }));

  it('should be created', inject([FavoriteService], (service: FavoriteService) => {
    expect(service).toBeTruthy();
  }));
});

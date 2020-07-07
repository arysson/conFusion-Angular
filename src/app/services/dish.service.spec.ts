import { TestBed, inject } from '@angular/core/testing';

import { DishService } from './dish.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('DishService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule
    ],
    providers: [
      DishService
    ]
  }));

  it('should be created', inject([DishService], (service: DishService) => {
    expect(service).toBeTruthy();
  }));
});

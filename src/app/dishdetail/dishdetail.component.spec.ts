import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishdetailComponent } from './dishdetail.component';
import { MatCardModule, MatListModule, MatFormFieldModule, MatSliderModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SDKBrowserModule } from '../shared/sdk';
import { baseURL } from '../shared/baseUrl';

describe('DishdetailComponent', () => {
  let component: DishdetailComponent;
  let fixture: ComponentFixture<DishdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishdetailComponent ],
      imports: [
        MatCardModule,
        RouterTestingModule.withRoutes([
          {
            path: 'dishdetail',
            component: DishdetailComponent
          }
        ]),
        MatListModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        SDKBrowserModule.forRoot()
      ],
      providers: [
        {
          provide: 'baseURL',
          useValue: baseURL
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishdetailComponent } from './dishdetail.component';
import { MatCardModule, MatListModule, MatFormFieldModule, MatSliderModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: 'BaseURL',
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

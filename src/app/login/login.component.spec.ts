import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatToolbarModule, MatFormFieldModule, MatCheckboxModule, MatDialogModule, MatDialogRef, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { SDKBrowserModule } from '../shared/sdk';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatToolbarModule,
        MatFormFieldModule,
        FormsModule,
        MatCheckboxModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularFireAuthModule,
        SDKBrowserModule.forRoot()
      ],
      providers: [
        {
          provide: MatDialogRef
        }
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

import { MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatGridListModule, MatFormFieldModule, MatSlideToggleModule, MatSelectModule, MatListModule, MatSliderModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesComponent } from './favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        MenuComponent,
        ContactComponent,
        DishdetailComponent,
        AboutComponent,
        FooterComponent,
        FavoritesComponent
      ],
      imports: [
        AppRoutingModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatListModule,
        MatSliderModule,
        RouterTestingModule.withRoutes([{
          path: '',
          component: AppComponent
        }]),
        MatDialogModule,
        FormsModule,
        HttpClientModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'conFusion'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('conFusion');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Ristorante Con Fusion');
  }));
});

import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { FavoritesComponent } from '../favorites/favorites.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'contactus',
        component: ContactComponent
    },
    {
        path: 'dishdetail/:id',
        component: DishdetailComponent
    },
    {
        path: 'aboutus',
        component: AboutComponent
    },
    {
        path: 'favorites',
        // canActivate: [AuthGuardService],
        component: FavoritesComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
]

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CustomerApi } from '../shared/sdk';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: CustomerApi, public router: Router) { }

  canActivate(): boolean {
    if (!this.authService.getCachedCurrent()) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}

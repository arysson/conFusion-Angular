import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable, of } from 'rxjs';
import { Favorite } from '../shared/favorite';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { FavoriteExists } from '../shared/favoriteExists';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient, public auth: AuthService, private processHTTPMsnService: ProcessHTTPMsgService) { }

  getFavorites(): Observable<Favorite> {
    if (!this.auth.isLoggedIn()) {
      return null;
    }
    return this.http.get<Favorite>(baseURL + 'favorites')
      .pipe(catchError(error => this.processHTTPMsnService.handleError(error)));
  }

  postFavorites(dishids: any) {
    return this.http.post(baseURL + 'favorites/', dishids)
      .pipe(catchError(error => this.processHTTPMsnService.handleError(error)));
  }

  isFavorite(id: string): Observable<FavoriteExists> {
    if (!this.auth.isLoggedIn()) {
      return of({
        exists: false,
        favorites: null
      });
    }
    return this.http.get<FavoriteExists>(baseURL + 'favorites/' + id)
      .pipe(catchError(error => this.processHTTPMsnService.handleError(error)));
  }

  postFavorite(id: string) {
    return this.http.post(baseURL + 'favorites/' + id, {})
      .pipe(catchError(error => this.processHTTPMsnService.handleError(error)));
  }

  deleteFavorite(id: string) {
    return this.http.delete(baseURL + 'favorites/' + id)
      .pipe(catchError(error => this.processHTTPMsnService.handleError(error)));
  }
}

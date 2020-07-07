import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { Favorite, FavDish } from '../shared/favorite';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  userId: string = undefined;
  username: string = undefined;

  constructor(private afs: AngularFirestore, private auth: AuthService) { 
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        // User is signed in.
        this.userId = user.uid;
        this.username = user.email;
      } else {
        this.userId = undefined;
      }
    });
  }

  getFavorites(): Observable<FavDish[]> {
    if (this.userId) {
      return this.afs.collection<FavDish>('favorites', ref => ref.where('user', '==', this.userId)).valueChanges();
    } else {
      return throwError(new Error('No User Logged In!'));
    }
  }

  // postFavorites(dishids: any) {
  //   return this.http.post(baseURL + 'favorites/', dishids)
  //     .pipe(catchError(error => this.processHTTPMsnService.handleError(error)));
  // }

  isFavorite(id: string): Promise<boolean> {
    const db = firebase.firestore();
    if (this.userId) {
      return db.collection('favorites').where('user', '==', this.userId).where('dish', '==', id).get().then(doc => !doc.empty);
    } else {
      return Promise.resolve(false);
    }
  }

  postFavorite(id: string) {
    if (this.userId) {
      return this.afs.collection('favorites').add({
        user: this.userId,
        dish: id
      });
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  deleteFavorite(id: string): Promise<void> {
    const db = firebase.firestore();
    if (this.userId) {
      return db.collection('favorites').where('user', '==', this.userId).where('dish', '==', id).get().then(doc => doc.forEach(docu => db.doc('favorites/' + docu.id).delete()));
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }
}

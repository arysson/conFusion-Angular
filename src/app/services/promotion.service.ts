import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private afs: AngularFirestore) { }

  getPromotions(): Observable<Promotion[]> {
    return this.afs.collection<Promotion>('promotion').snapshotChanges().pipe(map(actions => actions.map(action => {
      const data = action.payload.doc.data() as Promotion;
      const _id = action.payload.doc.id;
      return { _id, ... data };
    })));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.afs.doc<Promotion>('promotions/' + id).snapshotChanges().pipe(map(action => {
      const data = action.payload.data() as Promotion;
      const _id = action.payload.id;
      return { _id, ... data };
    }));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.afs.collection<Promotion>('promotions', ref => ref.where('featured', '==', true)).snapshotChanges().pipe(map(actions => actions.map(action => {
      const data = action.payload.doc.data() as Promotion;
      const _id = action.payload.doc.id;
      return { _id, ... data };
    })[0]));
  }
}

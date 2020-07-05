import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite;
  delete: boolean;
  errMess: string;

  constructor(private favoriteService: FavoriteService, @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    const myFavorites = this.favoriteService.getFavorites();
    if (myFavorites) {
      myFavorites.subscribe(
        favorites => this.favorites = favorites, 
        errmess => this.errMess = <any>errmess
      );
    }
  }

  deleteFavorite(id: string) {
    console.log('Deleting Dish ' + id);
    this.favoriteService.deleteFavorite(id)
      .subscribe(
        favorites => this.favorites = <Favorite>favorites,
        errmess => this.errMess = <any>errmess
      );
    this.delete = false;
  }

}

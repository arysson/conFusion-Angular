import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Favorite, FavDish } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
import { DishService } from '../services/dish.service';

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

  favorites = {
    user: '',
    dishes: []
  };

  delete: boolean;
  errMess: string;
  favorite: FavDish;

  constructor(private favoriteService: FavoriteService, private dishservice: DishService) { }

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe(favorites => {
      this.favorites = {
        user: '',
        dishes: []
      };
      favorites.forEach(favorite => this.dishservice.getDish(favorite.dish).subscribe(dish => this.favorites.dishes.push(dish)));
    }, errmess => this.errMess = <any>errmess);
  }

  deleteFavorite(id: string) {
    this.favoriteService.deleteFavorite(id);
    this.delete = false;
  }

}

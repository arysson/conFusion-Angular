import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Dishes, Promotions, Leaders, DishesApi, PromotionsApi, LeadersApi, LoopBackConfig } from '../shared/sdk';
import { API_VERSION } from '../shared/baseUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dish: Dishes;
  promotion: Promotions;
  leader: Leaders;
  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;
  
  constructor(private dishservice: DishesApi, private promotionservice: PromotionsApi, private leaderservice: LeadersApi, @Inject('baseURL') private baseURL) { 
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.dishservice.findOne({
      where: {
        featured: true
      }
    }).subscribe(
        (dish: Dishes) => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess
      );
    this.promotionservice.findOne({
      where: {
        featured: true
      }
    }).subscribe(
        (promotion: Promotions) => this.promotion = promotion,
        errmess => this.promotionErrMess = <any>errmess
      );
    this.leaderservice.findOne({
      where: {
        featured: true
      }
    }).subscribe(
        (leader: Leaders) => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess
      );
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Leaders, LeadersApi, LoopBackConfig } from '../shared/sdk';
import { API_VERSION } from '../shared/baseUrl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {

  leaders: Leaders[];
  errMess: string;
  
  constructor(private leaderService: LeadersApi, @Inject('baseURL') private baseURL) { 
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.leaderService.find()
      .subscribe(
        (leaders: Leaders[]) => this.leaders = leaders,
        errmess => this.errMess = <any>errmess
      );
  }

}

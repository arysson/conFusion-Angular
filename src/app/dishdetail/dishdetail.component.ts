import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  visibility = 'shown';
  favorite = false;
  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required': 'Comment is required.'
    }
  };

  constructor(
    private dishservice: DishService, 
    private route: ActivatedRoute, 
    private location: Location, 
    private fb: FormBuilder,
    private favoriteService: FavoriteService,
    @Inject('BaseURL') private baseURL
  ) {}

  ngOnInit() {
    this.createForm();
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.visibility = 'hidden';
            return this.dishservice.getDish(params['id']);
          }
        )
      )
      .subscribe(
        dish => {
          this.dish = dish;
          this.setPrevNext(dish._id);
          this.visibility = 'shown';
          this.favoriteService.isFavorite(this.dish._id)
            .subscribe(
              resp => {
                console.log(resp);
                this.favorite = <boolean>resp.exists;
              },
              err => console.log(err)
            );
        }, 
        errmess => this.errMess = <any>errmess
      );
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clean previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const error in control.errors) {
            if (control.errors.hasOwnProperty(error)) {
              this.formErrors[field] += messages[error] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.dishservice.postComment(this.dish._id, this.commentForm.value)
      .subscribe(dish => this.dish = <Dish>dish);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
  }

  addToFavorites() {
    if (!this.favorite) {
      this.favoriteService.postFavorite(this.dish._id)
        .subscribe(favorites => {
          console.log(favorites);
          this.favorite = true;
        });
    }
  }
}

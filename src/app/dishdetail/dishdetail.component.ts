import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Dishes, Comment, DishesApi, FavoriteApi, CommentApi, CustomerApi, LoopBackConfig } from '../shared/sdk';
import { API_VERSION } from '../shared/baseUrl';

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

  dish: Dishes;
  commentForm: FormGroup;
  comment: Comment
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

  constructor(private dishservice: DishesApi, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private favoriteService: FavoriteApi, private commentService: CommentApi, private authService: CustomerApi, @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.createForm();
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.visibility = 'hidden';
            return this.dishservice.findById(params['id']);
          }
        )
      )
      .subscribe(
        (dish: Dishes) => {
          this.dish = dish;
          this.dishservice.getComments(this.dish.id, {
            include: ['customer']
          }).subscribe((comments: Comment[]) => this.dish.comments = comments);
          this.visibility = 'shown';
          if (this.authService.getCachedCurrent()) {
            this.authService.getFavorites(this.authService.getCachedCurrent().id, {
              where: {
                dishesId: this.dish.id
              }
            }).subscribe(res => res.length === 0 ? this.favorite = false : this.favorite = true);
          }
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

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    if (this.authService.getCachedCurrent()) {
      this.commentService.create({
        rating: this.comment.rating,
        comment: this.comment.comment,
        dishesId: this.dish.id,
        customerId: this.authService.getCachedCurrent().id
      }).subscribe(res => {
        console.log(res);
        this.dishservice.getComments(this.dish.id, {
          include: ['customer']
        }).subscribe((comments: Comment[]) => this.dish.comments = comments);
      })
    }
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
  }

  addToFavorites() {
    if (!this.favorite && this.authService.getCachedCurrent()) {
      this.favoriteService.create({
        customerId: this.authService.getCachedCurrent().id,
        dishesId: this.dish.id
      }).subscribe(favorites => {
        console.log(favorites);
        this.favorite = true;
      });
    }
  }
}

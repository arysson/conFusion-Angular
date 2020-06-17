import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger(
      'visibility',
      [
        state(
          'shown',
          style({
            transform: 'scale(1.0)',
            opacity: 1
          })
        ),
        state(
          'hidden',
          style({
            transform: 'scale(0.5)',
            opacity: 0
          })
        ),
        transition('* => *', animate('0.5s ease-in-out'))
      ]
    )
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
  dishcopy: Dish;
  visibility = 'shown';
  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  constructor(
    private dishservice: DishService, 
    private route: ActivatedRoute, 
    private location: Location, 
    private fb: FormBuilder,
    @Inject('BaseURL') private baseURL
  ) { 
    this.createForm();
  }

  ngOnInit() {
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
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        }, 
        errmess => this.errMess = <any>errmess
      );
  }

  createForm() {
    this.commentForm = this.fb.group({
      'author': ['', [Validators.required, Validators.minLength(2)]],
      'rating': 5,
      'comment': ['', Validators.required]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.commentForm.get(field);
      if (control && control.dirty && !control.valid) {
        for (const error in control.errors) {
          this.formErrors[field] += this.validationMessages[field][error] + ' ';
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
    this.comment = this.commentForm.value;
    this.comment.date = (new Date()).toISOString();
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
        },
        errmess => {
          this.dish = null;
          this.dishcopy = null;
          this.errMess = <any>errmess;
        }
      );
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      'author': '',
      'rating': 5,
      'comment': ''
    });
  }

}

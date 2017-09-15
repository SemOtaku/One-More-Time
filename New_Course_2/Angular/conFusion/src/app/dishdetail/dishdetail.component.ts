import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import { Dish } from '../shared/dish';
import {DishService} from "../services/dish.service";
import 'rxjs/add/operator/switchMap';

import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import {Comment} from "../shared/comment";
import {expand, visibility} from "../animations/app.animation";
import {flyInOut} from "../animations/app.animation";


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]

})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  comment: Comment;

  errMess: string;
  visibility = 'shown';

  formErrors = {
    'author': '',
    'commentText': ''
  };

  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.'
    },
    'commentText': {
      'required': 'Your commentary is required.'
    }
  }

  @ViewChild(FormGroupDirective) commentFormDirective;


  constructor(private dishservice: DishService,
              private location: Location,
              private route: ActivatedRoute,
              private cm: FormBuilder,
              @Inject('BaseURL') private BaseURL)
  {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';},
          errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.commentForm = this.cm.group({
      author: ['', [Validators.required,Validators.minLength(2)]],
      rating: 5,
      commentText: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {return;}
    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.dishcopy.commentText = null;
    this.comment.date = new Date().toISOString();
    this.comment.comment = this.commentForm.value.commentText;
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => this.dish = dish);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  isAuthSubscription : Subscription;
  isAuth = false;
  submitted = false;
  message = true;

  constructor( private authService: AuthService,
               private  router: Router,
               private formBuilder: FormBuilder) {
    this.user = new User('','','');

  }

  ngOnInit(): void {
    this.redirectIfIdentity();
    this.logout();
    this.initForm();
  }

  initForm()
  {
    this.loginForm = this.formBuilder.group({
      username :['', Validators.required],
      password :['', Validators.required ]
    });

  }

  onSubmitForm()
  {
     this.submitted = true;
    const formValue = this.loginForm.value;
    this.user = new User('',formValue['username'],formValue['password']);
    this.authService.signIn(this.user);
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (auth: boolean) => {
        this.isAuth = auth;
        if(this.isAuth) {
          this.message = true;
          return this.router.navigate(['/']);
        }
        else if (this.isAuth === false)  {
          this.message = false;
          return this.router.navigate(['/login']);
        }
          }
    );
  }

  logout()
  {
    const route = this.router.url;
    if(route == "/logout")
    {
      this.authService.logout();
      this.router.navigate(['/']);
    }

  }

  redirectIfIdentity()
  {
    if(this.authService.getIdentity())
    {
      this.router.navigate(["/"]);
    }
  }

}

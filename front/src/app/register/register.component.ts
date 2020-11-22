import {Component, OnDestroy, OnInit} from '@angular/core';

import { User } from '../models/user';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy  {

  userForm: FormGroup;
  signSubscription: Subscription;
  user: User;
  errors: string[] = [];
  submitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.user = new User('','','');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm()
  {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:  ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  get f() { return this.userForm.controls; }

  onSubmit()
  {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const value = this.userForm.value;

    this.user = new User(value['email'], value['username'], value['password']);
    this.signSubscription = this.userService.createUser(this.user).subscribe(
      (response:any) => {
        if(response.result == 'success')
          this.router.navigate(['/login']);
      },
    (error) => {
    if(error.error)
      for(let i = 0; i < error.error.length; i++)
      {
        this.errors[i] = error.error[i].message;
      }
    return this.router.navigate(['/register']);
  }
    );

  }

  ngOnDestroy() {
    if(this.signSubscription)
        this.signSubscription.unsubscribe();
  }

}

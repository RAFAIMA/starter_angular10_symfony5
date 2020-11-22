import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {BehaviorSubject} from 'rxjs';
import {GLOBAL} from '../global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url;
  private user: User;
  userSubject = new BehaviorSubject<User>(new User('', '', ''));

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  emitUser()
  {
    this.userSubject.next(this.user);
  }


  createUser(user)
  {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(`${this.url}/register`, json, { headers}).pipe(map(res => res));
  }
}

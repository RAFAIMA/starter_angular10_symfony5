import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from '../global';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url;
  private identity;
  private token;
  private isAuth = false;
  private user = null;

  isAuthSubject = new BehaviorSubject<boolean>(null);
  userSubject = new BehaviorSubject<object>(null);

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }

  emitAuth()
  {
    this.isAuthSubject.next(this.isAuth);
    this.userSubject.next(this.user);

  }


  signInServer(user)
  {
    const json = JSON.stringify({username: user.username, password: user.password});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = `${json}`;
    return this.httpClient.post(`${this.url}/api/login_check`, params ,{headers: headers}).pipe(map(res => res));
  }


  signIn(user)
  {
    this.signInServer(user).subscribe(
      (response: any) => {

        if(response.token)
        {
          const decoded = jwt_decode(response.token);
          localStorage.setItem('identity', JSON.stringify(decoded.username));
          localStorage.setItem('token', JSON.stringify(response.token));
          this.user = { identity: decoded.username};
          this.isAuth = true;
          this.emitAuth();
          return response;
        }



      },
      (error: any ) => {
        this.isAuth = false;
        this.user = null;
        this.emitAuth();
      }
    );


  }


  getIdentity(){
    this.identity = JSON.parse(localStorage.getItem('identity'));
    return this.identity;
  }

  getToken(){
    this.token = JSON.parse(localStorage.getItem('token'));
    return this.token;
  }

  getNotExpireFromServer(){
    const token = this.getToken();
    const decoded = jwt_decode( token);
    const headers = new HttpHeaders({'Content-Type': 'application/json;', 'Authorization':  `Bearer ${token}`});
    return this.httpClient.get(`${this.url}/api/ifExpire`,{ headers: headers}).pipe( map(res => res));
  }

  getTokenNotExpire(){

    this.getNotExpireFromServer().subscribe(
      (response: any) => {

      },
      (error) => {
        console.log('Error');
        this.logout();
      }

    );
  }


  logout()
  {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.isAuth = null;
    this.user = null;
    this.emitAuth();
  }

}

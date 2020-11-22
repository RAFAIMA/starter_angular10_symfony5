import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  identity;
  constructor( public authService: AuthService) { }

  ngOnInit(): void {
    this.verifyAuthentication();
  }

 verifyAuthentication()
{
  //this._authService
  const id = this.authService.getIdentity();

  if ( id )
  {
    this.authService.isAuthSubject.next(true);
    this.authService.userSubject.next({ identity: id});

    this.identity = id;

  }
  else{
    this.authService.isAuthSubject.next(null);
    this.authService.userSubject.next(null);
  }

}
}

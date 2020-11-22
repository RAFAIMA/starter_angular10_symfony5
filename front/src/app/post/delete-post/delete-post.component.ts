import { Component, OnInit } from '@angular/core';

import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Post} from '../../models/post';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-delete-post',
  template: '',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  token;

  constructor(private postService: PostService, private authService: AuthService ,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.deletePost();

  }

  deletePost()
  {
    const id = this.route.snapshot.params['id'];
    this.postService.deletePost(id, this.token).subscribe(
      (response: any ) =>
      {
        if(response.result == "success") {
          this.router.navigate(['']);
        }
      },
      (error) =>{
        console.log(error);
      }

    );
  }


}

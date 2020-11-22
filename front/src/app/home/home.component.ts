import { Component, OnInit , OnDestroy } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  posts: Post[];
  postSubscriber: Subscription;
  constructor(private postService: PostService, public authService: AuthService) {

  }

  ngOnInit(): void {
     this.postService.getPosts();
     this.postSubscriber = this.postService.postsSubject.subscribe(
       (posts: Post[]) => {
         this.posts = posts;
       }
     );
  }

  ngOnDestroy(): void {

    this.postSubscriber.unsubscribe();

  }


}

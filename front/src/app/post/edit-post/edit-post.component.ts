import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Post} from '../../models/post';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  postSubsc: Subscription;
  post: Post;
  token;

  constructor(private postService: PostService,
              private  router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
    this.post = new Post(0,'','' ); }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getOnePost();

  }
  getOnePost()
  {
    const id = this.route.snapshot.params['id'];

    this.postService.getPost(id, this.token );
    this.postSubsc = this.postService.postSubject.subscribe(
      (post: Post) =>
      {
        this.post = post;
      }
    );
  }

  onSubmit(form: NgForm)
  {

    const post = new Post(form.value['id'],form.value['title'], form.value['description']);
    this.postService.editPost(post, this.token).subscribe(
      (response: any) =>{

          return this.router.navigate(['']);

      }
    );
  }

  ngOnDestroy(): void {
    this.postSubsc.unsubscribe();
  }

}

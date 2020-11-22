import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { Post } from '../../models/post';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  post: Post;
  token;
  errors: string[];
  submitted = false;
  constructor(private postService: PostService,
              private  router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService ) {
        this.post = new Post(0,'','' );
  }

  ngOnInit(): void {

  this.initForm();
  this.token = this.authService.getToken();
  }

  initForm()
  {
    this.errors = [];
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

  get f() { return this.postForm.controls; }

  onSubmit()
  {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }

    const value = this.postForm.value;

    const post = {title: value['title'] , description: value['description']};

    this.postService.createPost(post, this.token).subscribe(
      (response: any) =>{

        if(response.status == 'Yes'){

            return this.router.navigate(['']);
        }
        else
          return this.router.navigate(['/post/new']);
      },
      (error) => {
        if(error.error)
          for(let i = 0; i < error.error.length; i++)
          {
            this.errors[i] = error.error[i].message + ' (Validation from server)';

          }
        return this.router.navigate(['/post/new']);
      }
    );

  }

}

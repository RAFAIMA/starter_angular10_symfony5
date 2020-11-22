import { Injectable } from '@angular/core';
import { Post} from '../models/post';
import {BehaviorSubject} from 'rxjs';
import {GLOBAL} from '../global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[];
  private post: Post;

  postsSubject = new BehaviorSubject<Post[]>([]);
  postSubject = new BehaviorSubject<Post>(new Post(0,'',''));
  url;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  emitPosts()
  {
    this.postsSubject.next(this.posts);
  }

  emitPost()
  {
    this.postSubject.next(this.post);
  }

  getPostsFromServer()
  {
    const headers = new HttpHeaders({'Content-Type':'application/json;'});
    return this.http.get(`${this.url}/posts`,{ headers: headers}).pipe( map(res => res));
  }

  getOnePostFromServer(id , token)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json;','Authorization':  `Bearer ${token}`});

    return this.http.get(`${this.url}/api/posts/post/${id}`, {headers: headers} ).pipe(map(res => res));
  }

  getPosts()
  {
    this.getPostsFromServer().subscribe(
      (response: any) => {
         this.posts = response.posts;
         this.emitPosts();
      },
      (error) => {
        console.log('Error');
      }

    );
  }

  // tslint:disable-next-line:typedef
  createPost(post , token)
  {
    const json = JSON.stringify(post);

    const headers = new HttpHeaders({'Content-Type':'application/json;','Authorization':  `Bearer ${token}`});

    const params = `${json}`;

    return  this.http.post(`${this.url}/api/post/new`, params ,{ headers : headers})
      .pipe(map(res => res));
  }

  getPost(id , token)
  {
    this.getOnePostFromServer(id , token).subscribe(
      (response: any) => {
        this.post = response.post;

        this.emitPost();
      },
      (error) => {
        console.log('Error');
      }

    );
  }

  editPost(post, token)
    {

    const json = JSON.stringify(post);
      const headers = new HttpHeaders({'Content-Type': 'application/json;','Authorization':  `Bearer ${token}`});
    const params = `${json}`;
    return  this.http.post(`${this.url}/api/post/edit`, params ,{ headers : headers})
      .pipe(map(res => res));

  }


  deletePost(id, token)
  {
    const json = JSON.stringify(id);
    const headers = new HttpHeaders({'Content-Type': 'application/json;','Authorization':  `Bearer ${token}`});

    return  this.http.post(`${this.url}/api/post/delete/${id}`, {} ,{headers: headers})
      .pipe(map(res => res));
  }


}

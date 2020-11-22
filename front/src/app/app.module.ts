import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewPostComponent } from './post/new-post/new-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { DeletePostComponent } from './post/delete-post/delete-post.component';
import {AuthGuardService} from './services/auth-guard.service';
import { TokenInterceptor} from './interceptor/token.interceptor';
import {AuthService} from './services/auth.service';
import {PostService} from "./services/post.service";
import {UserService} from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    NewPostComponent,
    EditPostComponent,
    DeletePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
     AuthGuardService, AuthService, PostService , UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

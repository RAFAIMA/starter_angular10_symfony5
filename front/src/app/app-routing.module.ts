import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { DeletePostComponent } from './post/delete-post/delete-post.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'post/new', canActivate: [AuthGuardService] , component: NewPostComponent },
  { path: 'post/edit/:id', canActivate: [AuthGuardService] , component: EditPostComponent },
  { path: 'post/delete/:id', canActivate: [AuthGuardService] , component: DeletePostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

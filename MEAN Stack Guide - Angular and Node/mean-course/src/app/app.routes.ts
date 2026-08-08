import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list';
import { PostCreateComponent } from './posts/post-create/post-create';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: PostListComponent }, //Configures default route URL
  { path: 'create', component: PostCreateComponent, canActivate: [authGuard] }, //Maps "create" URL path, protected with authGuard
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [authGuard] }, //Maps "edit" URL path, protected with authGuard
  { path: 'login', component: LoginComponent }, //Maps "login" URL path to present a user login screen
  { path: 'signup', component: SignupComponent }, //Maps "signup" URL path to present a user signup screen
];
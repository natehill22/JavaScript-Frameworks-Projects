import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list';
import { PostCreateComponent } from './posts/post-create/post-create';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
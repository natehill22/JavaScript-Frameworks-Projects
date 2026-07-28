import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list';
import { PostCreateComponent } from './posts/post-create/post-create';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent },
];
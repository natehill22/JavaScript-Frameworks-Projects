import { Component } from '@angular/core';
import { PostCreateComponent } from "./posts/post-create/post-create";
import { HeaderComponent } from './header/header';
import { PostListComponent } from './posts/post-list/post-list';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [PostCreateComponent, HeaderComponent, PostListComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  
}

import { Component } from '@angular/core';
import { PostCreateComponent } from "./posts/post-create/post-create";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { PostListComponent } from './posts/post-list/post-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostCreateComponent, HeaderComponent, PostListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  
}

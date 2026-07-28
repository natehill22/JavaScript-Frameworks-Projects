import { Component } from '@angular/core';
import { PostCreateComponent } from "./posts/post-create/post-create";
import { HeaderComponent } from './header/header';
import { PostListComponent } from './posts/post-list/post-list';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HttpClientModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  
}

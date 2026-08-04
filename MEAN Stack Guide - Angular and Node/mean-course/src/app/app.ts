import { Component, OnInit } from '@angular/core';
import { PostCreateComponent } from "./posts/post-create/post-create";
import { HeaderComponent } from './header/header';
import { PostListComponent } from './posts/post-list/post-list';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}

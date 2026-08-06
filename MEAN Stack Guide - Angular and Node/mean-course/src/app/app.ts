import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  private authService = inject(AuthService);

  //Class initialization block runs instantly on load
  init = this.authService.autoAuthUser();
}

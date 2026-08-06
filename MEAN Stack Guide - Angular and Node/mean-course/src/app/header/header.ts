import { Component, inject } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { AuthService } from "../auth/auth.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    imports: [MatToolbarModule, RouterLink, MatAnchor, RouterLinkActive, MatButtonModule],
    styleUrls: ['./header.css']
})

export class HeaderComponent {
    private authService = inject(AuthService);

    //Binds directly to the read-only auth signal from the auth service
    userIsAuthenticated = this.authService.isAuthenticated;


    onLogout() {
        this.authService.logout();
    }
}


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
    private authService = inject(AuthService); //Gives access to user session states within AuthService

    //Stores a reference to the auth signal in the auth service
    userIsAuthenticated = this.authService.isAuthenticated;

    //Logs out of authentication
    onLogout() {
        this.authService.logout();
    }
}


import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    imports: [MatToolbarModule, RouterLink, MatAnchor, RouterLinkActive, MatButtonModule, CommonModule],
    styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    userIsAuthenticated = false;
    private authListenerSubs: Subscription = new Subscription();

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.authListenerSubs.unsubscribe();
    }
}


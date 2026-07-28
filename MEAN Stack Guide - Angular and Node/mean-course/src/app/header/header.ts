import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatAnchor, MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    imports: [MatToolbarModule, RouterLink, MatAnchor, RouterLinkActive, MatButtonModule],
    styleUrls: ['./header.css']
})

export class HeaderComponent {}

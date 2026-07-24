import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    imports: [MatToolbarModule]
})

export class HeaderComponent {}

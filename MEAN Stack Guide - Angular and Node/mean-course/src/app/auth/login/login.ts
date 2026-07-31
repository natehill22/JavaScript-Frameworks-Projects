import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInput, MatFormField, MatError } from "@angular/material/input";
import { MatCard } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { FormsModule, NgForm } from "@angular/forms";
import { MatAnchor } from "@angular/material/button";
import { AuthService } from "../auth.service";

@Component({
    templateUrl: './login.html',
    imports: [MatInput, MatCard, MatProgressSpinner, MatFormField, MatError, CommonModule, FormsModule, MatAnchor],
    styleUrls: ['./login.css']
})
export class LoginComponent {
    isLoading = false;

    constructor(public authService: AuthService) {}

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.login(form.value.email, form.value.password);
    }
}
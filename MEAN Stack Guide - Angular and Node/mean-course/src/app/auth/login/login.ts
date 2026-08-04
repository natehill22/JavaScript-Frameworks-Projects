import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInput, MatFormField, MatError } from "@angular/material/input";
import { MatCard } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { FormsModule, NgForm } from "@angular/forms";
import { MatAnchor } from "@angular/material/button";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";


@Component({
    templateUrl: './login.html',
    imports: [MatInput, MatCard, MatProgressSpinner, MatFormField, MatError, CommonModule, FormsModule, MatAnchor],
    styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub!: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.login(form.value.email, form.value.password);
    }

        ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
}
import { Component, signal, inject, effect } from "@angular/core";
import { MatInput, MatFormField, MatError } from "@angular/material/input";
import { MatCard } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatAnchor } from "@angular/material/button";
import { FormsModule, NgForm } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";

import { AuthService } from "../auth.service";

@Component({
    templateUrl: './signup.html',
    imports: [MatInput, MatCard, MatProgressSpinner, MatFormField, MatError, FormsModule, MatAnchor],
    styleUrls: ['./signup.css']
})

//Manages signin behavior
export class SignupComponent {
    public authService = inject(AuthService); //Gives access to user session states within AuthService

    //Initializes a boolean signal to control is the loading spinner shows on screen
    isLoading = signal<boolean>(false);

    //Converts legacy listener stream to a signal to monitor authentication updates
    private authStatusSignal = toSignal(this.authService.getAuthStatusListener());

    constructor() {
        //Automatically turns off loading spinner whenever auth state settles
        effect(() => {
            if (this.authStatusSignal() !== undefined) {
                this.isLoading.set(false);
            }
        });
    }

    onSignup(form: NgForm) {
        if (form.invalid) {
            return; //Stops signup attempt if form is invalid
        }
        this.isLoading.set(true); //Shows spinner while network request processes
        this.authService.createUser(form.value.email, form.value.password); //Extracts user entered email and password and sends to share auth services to process signup
    }
}
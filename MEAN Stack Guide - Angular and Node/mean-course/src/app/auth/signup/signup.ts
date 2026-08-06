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
export class SignupComponent {
    public authService = inject(AuthService);

    //Component State Signal
    isLoading = signal<boolean>(false);

    //Convert the legacy stream into a sage signal context
    private authStatusSignal = toSignal(this.authService.getAuthStatusListener());

    constructor() {
        //Automatically turns off the loading spinner when the auth network request finishes
        effect(() => {
            if (this.authStatusSignal() !== undefined) {
                this.isLoading.set(false);
            }
        });
    }

    onSignup(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading.set(true);
        this.authService.createUser(form.value.email, form.value.password);
    }
}
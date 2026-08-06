import { Component, signal, inject, effect } from "@angular/core";
import { MatInput, MatFormField, MatError } from "@angular/material/input";
import { MatCard } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatAnchor } from "@angular/material/button";
import { FormsModule, NgForm } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";

import { AuthService } from "../auth.service";


@Component({
    templateUrl: './login.html',
    imports: [MatInput, MatCard, MatProgressSpinner, MatFormField, MatError, FormsModule, MatAnchor],
    styleUrls: ['./login.css']
})
export class LoginComponent {
    public authService = inject(AuthService);

    //Component State Signal
    isLoading = signal<boolean>(false);

    //Convert legacy listener stream to a signal to catch authentication failures/successes
    private authStatusSignal = toSignal(this.authService.getAuthStatusListener());

    constructor() {
        //Automatically turns off loading spinner whenever auth state settles
        effect(() => {
            if (this.authStatusSignal() !== undefined) {
                this.isLoading.set(false);
            }
        });
    }

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading.set(true);
        this.authService.login(form.value.email, form.value.password);
    }
}
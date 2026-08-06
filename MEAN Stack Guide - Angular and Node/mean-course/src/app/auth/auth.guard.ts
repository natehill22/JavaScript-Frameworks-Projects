import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "./auth.service";


export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    //Read directly from your new reactive authentication signal
    const isAuth = authService.isAuthenticated();
    if (!isAuth) {
        router.navigate(['/login']);
    }
    return isAuth;
}
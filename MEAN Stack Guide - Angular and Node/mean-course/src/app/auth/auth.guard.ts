import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "./auth.service";

//Defines and exports a modern NG functional route guard
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService); //Gives access to user session states within AuthService
    const router = inject(Router); //Helps navigate between pages

    //Reads activation state directly from the authentication signal
    const isAuth = authService.isAuthenticated();
    if (!isAuth) {
        router.navigate(['/login']); //Takes users to login if unauthenticated
    }
    return isAuth; //Allows authenticated users to the page
}
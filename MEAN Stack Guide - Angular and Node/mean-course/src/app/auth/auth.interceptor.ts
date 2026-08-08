import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";

import { AuthService } from "./auth.service";

//Defines and exports a modern NG HTTP functional interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService); //Gives access to user session states within AuthService

    //Reads token directly from the reactive signal
    const authToken = authService.token();
        if (authToken) {
            //If token exists, clone the http request and append Authorization header with Bearer token
            const authRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`)
            });
            return next(authRequest); //Forwards new request to the backend API
        }
        return next(req); //Forwards unmodified request to backend API if no token is present
};
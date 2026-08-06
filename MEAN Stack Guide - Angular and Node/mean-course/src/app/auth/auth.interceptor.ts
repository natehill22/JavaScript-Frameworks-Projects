import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";

import { AuthService } from "./auth.service";


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    //Read the token directly fro your reactive signal
    const authToken = authService.token();
        if (authToken) {
            const authRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`)
            });
            return next(authRequest);
        }
        return next(req);
};
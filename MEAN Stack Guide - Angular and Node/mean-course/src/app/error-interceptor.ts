import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog"

import { ErrorComponent } from "./error/error";

//Defines and exports a modern NG HTTP functional interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const dialog = inject(MatDialog); //Allows the interceptor to open modal pop-ups

    //Passes request along to next backend handler and begins a pipe to inspect, transform, or handle incoming stream
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => { //Intercepts any HTTP errors
            let errorMessage = "An unknown error occurred!"; //Defines error message
            if (error.error?.message) { //Checks if returned error object exists and contains a message
                errorMessage = error.error.message; //If so, overwrites defined message with error message in backend API
            }
            dialog.open(ErrorComponent, { data: { message: errorMessage } }); //Opens pop-up filled with error message
            return throwError(() => error); //Modern RxJS throwError syntax
        })
    );
};
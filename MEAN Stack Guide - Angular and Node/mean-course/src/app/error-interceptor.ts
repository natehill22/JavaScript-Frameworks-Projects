import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog"

import { ErrorComponent } from "./error/error";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const dialog = inject(MatDialog);

    //Call next directly as a function instead of next.handle()
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = "An unknown error occurred!";
            if (error.error?.message) {
                errorMessage = error.error.message;
            }
            dialog.open(ErrorComponent, { data: { message: errorMessage } });
            return throwError(() => error); //Modern RxJS throwError syntax
        })
    );
};
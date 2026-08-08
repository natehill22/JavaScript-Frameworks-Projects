import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';
import { errorInterceptor } from './error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), //Registers built-in listeners to catch unhandled runtime errors
    provideRouter(routes, withComponentInputBinding()), //Sets up NG Router with routes and automatically maps route params (like ids) directly to components
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])), //Hooks up an array of functional http interceptors
  ]
};

import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal, computed } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs"; //Kept only as a simple fallback compatibility layer

import { AuthData } from "./auth-data.model";
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: 'root' })

export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    //Single source of truth state using a Signal
    private authState = signal<{
        token: string;
        isAuthenticated: boolean;
        userId: string | null;
    }>({
        token: '',
        isAuthenticated: false,
        userId: null
    });

    private tokenTimer: any;

    //Legacy RxJS compatibility stream for components using toSignal()
    private authStatus$ = new Subject<boolean>();

    //Expose clean, read-only Signals to the application
    token = computed(() => {
        const currentToken = this.authState().token;
        if (!currentToken) {
            return localStorage.getItem('token') || '';
        }
        return currentToken;
    });

    isAuthenticated = computed(() => this.authState().isAuthenticated);
    userId = computed(() => this.authState().userId ?? '');

    //Synchronized methods to maintain compatibility with your components' current toSignal() calls
    getToken() {
        return this.token();
    }

    getIsAuth() {
        return this.isAuthenticated();
    }

    getUserId() {
        return this.userId();
    }

    getAuthStatusListener() {
        return this.authStatus$.asObservable();
    }

    createUser(email: string, password: string) {
        const authData: AuthData = { email, password };
        this.http.post(BACKEND_URL + "signup", authData)
        .subscribe({
            next: () => this.router.navigateByUrl("/"),
            error: () => this.authStatus$.next(false)
        });
    }

    login(email: string, password: string) {
        const authData: AuthData = { email, password };
        this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + "login", authData)
        .subscribe({
            next: (response) => {
            const token = response.token;
            if (token) {
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);

                //Update your single reactive state block
                this.authState.set({
                    token: token,
                    isAuthenticated: true,
                    userId: response.userId
                });

                this.authStatus$.next(true);

                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(token, expirationDate, response.userId);
                this.router.navigate(['/']);
            }
            localStorage.setItem('token', token);
        }, 
        error: () => this.authStatus$.next(false)
        });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation || !authInformation.expirationDate || !authInformation.token || !authInformation.userId) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.authState.set({
                token: authInformation.token,
                isAuthenticated: true,
                userId: authInformation.userId
            });
            this.setAuthTimer(expiresIn / 1000);
            this.authStatus$.next(true);
        }
    }

    logout() {
        this.authState.set({
            token: '',
            isAuthenticated: false,
            userId: null
        });
        this.authStatus$.next(false);
        
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
                    this.logout();
                }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    }
}
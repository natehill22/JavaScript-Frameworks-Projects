import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal, computed } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs"; //Kept only as a simple fallback compatibility layer

import { AuthData } from "./auth-data.model";
import { environment } from '../../environments/environment';

//Constructs the API endpoint path and places that URL into the BACKEND_URL variable
const BACKEND_URL = environment.apiUrl + "/user/";

//Marks class as a globally available injectable service (as a singleton)
@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient); //Helps make API requests
    private router = inject(Router); //Helps navigate between pages

    //Defines a signal serving as the single source of truth for authentication state
    private authState = signal<{
        token: string;
        isAuthenticated: boolean;
        userId: string | null;
    }>({ //Initializes with empty and null values
        token: '',
        isAuthenticated: false,
        userId: null
    });

    //Declares property to hold setTimeout reference id (to handle session expiration)
    private tokenTimer: any;

    //Legacy RxJS compatibility stream for components using toSignal()
    private authStatus$ = new Subject<boolean>();

    //Defines a signal wrapper for the token, which auto-updates
    token = computed(() => {
        const currentToken = this.authState().token; //Assigns currentToken to the raw token string
        if (!currentToken) {
            return localStorage.getItem('token') || ''; //Checks localStorage for a saved token if no token is populated
        }
        return currentToken;
    });

    //Defines a boolean signal that components can call to track if the user is logged in
    isAuthenticated = computed(() => this.authState().isAuthenticated);
    //Defines a signal to return the user's id (or falls back to an empty string if null)
    userId = computed(() => this.authState().userId ?? '');

    //Returns value of token (legacy getter method to bridge with older components)
    getToken() {
        return this.token();
    }

    //Returns evaluated authentication boolean value (legacy getter method to bridge with older components)
    getIsAuth() {
        return this.isAuthenticated();
    }

    //Returns user's ID (legacy getter method to bridge with older components)
    getUserId() {
        return this.userId();
    }

    //Prevents externals files from forcing data into the read-only observable 
    getAuthStatusListener() {
        return this.authStatus$.asObservable();
    }

    //Registers new users by accepting email and password
    createUser(email: string, password: string) {
        const authData: AuthData = { email, password }; //Packages credentials into an object (that matches the AuthData template)
        this.http.post(BACKEND_URL + "signup", authData) //Sends a POST request to the backend with credentials object
        .subscribe({
            next: () => this.router.navigateByUrl("/"), //Upon success, user is redirected to the default page
            error: () => this.authStatus$.next(false) //Failure pushes a false state and closes request subscription
        });
    }

    //Accepts email and password to run user authentication against backend endpoint
    login(email: string, password: string) {
        const authData: AuthData = { email, password }; //Packages credentials into an object (that matches the AuthData template)
        this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + "login", authData) //Sends a POST request to the backend with credentials object
        .subscribe({
            next: (response) => {
            const token = response.token; //Upon success, grab token from response
            if (token) {
                const expiresInDuration = response.expiresIn; //If there's a token, grab expiresIn data from the response
                this.setAuthTimer(expiresInDuration); //Uses that time signature in the setAuthTimer function (to start the timeout process)

                //Overwrites signal state block with token, auth boolean, and userId values
                this.authState.set({
                    token: token,
                    isAuthenticated: true,
                    userId: response.userId
                });

                this.authStatus$.next(true); //Emits a 'true' flag down legacy stream to notify older subscribing modules

                const now = new Date(); //Creates a new date object with current date/time
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000); //Creates an expiration date by adding 1 hour to the current timestamp
                this.saveAuthData(token, expirationDate, response.userId); //Pushes credentials and exp.time to browser's localStorage
                this.router.navigate(['/']); //Redirects authenticated users to the default page
            }
            localStorage.setItem('token', token); //Resaves token string inside localStorage
        }, 
        error: () => this.authStatus$.next(false) //Catches auth errors, alerts legacy streams, and terminates login subscription
        });
    }

    //Checks for an existing valid session from a past visit
    autoAuthUser() {
        const authInformation = this.getAuthData(); //Queries local browser storage to collect existing session tokens, timestamps, and identifiers
        if (!authInformation || !authInformation.expirationDate || !authInformation.token || !authInformation.userId) {
            return; //Breaks execution if storage data is missing or incomplete
        }
        const now = new Date(); //Creates a current timestamp
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); //Subtracts the current timestamp from the expiration date in localStorage
        if (expiresIn > 0) {
            //If calculation is greater than 0 (within the timeframe), set auth signal to true
            this.authState.set({
                token: authInformation.token,
                isAuthenticated: true,
                userId: authInformation.userId
            });
            this.setAuthTimer(expiresIn / 1000); //Re-initializes the countdown timer so the user is still logged out at the right moment
            this.authStatus$.next(true); //Alerts legacy subscribers that auth is successfully restored
        }
    }

    //Strips the user's active sessions state
    logout() {
        //Wipes active signal state clean, resetting properties to default (null) states
        this.authState.set({
            token: '',
            isAuthenticated: false,
            userId: null
        });
        this.authStatus$.next(false); //Pushes a negative flag down legacy compatibility stream
        
        clearTimeout(this.tokenTimer); //Stops browser's background (JS) timer
        this.clearAuthData(); //Removes local browser storage of session data
        this.router.navigate(['/']); //Redirects users back to main page
    }

    //Handles token lifespans
    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
                    this.logout(); //Runs the logout function once the token duration hits zero
                }, duration * 1000); 
    }

    //Saves session token, expDate, and userId to local browser storage
    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString()); //Converts Date object into a universal ISO timestamp string
        localStorage.setItem("userId", userId);
    }

    //Removes local browser storage of session token, expDate, and userId
    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    //Queries local browser storage to collect existing session tokens, timestamps, and identifiers
    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate || !userId) {
            return null; //Stop the process if no token, expDate, or userId exists
        }
        return { //Otherwise, return the browser's stored data
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    }
}
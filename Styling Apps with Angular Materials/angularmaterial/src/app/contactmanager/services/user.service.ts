import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' //Automatically registers a service within the app's root directory
})
export class UserService {

  private _users: BehaviorSubject<User[]>; //Acts as both observable and observer, always stores latest emitted value and gives that value to any subscribing component

  private dataStore: { //A cache object holding current array of User objects
    users: User[]
  }

  constructor(private http: HttpClient) { //Allows the service to make backend API calls
    this.dataStore = { users: [] }; //Instatiates cache as an empty list
    this._users = new BehaviorSubject<User[]>([]); //Initializes reactive data stream with an empty array
  }

  //Getter property - components can read from it like a variable
  get users(): Observable<User[]> { 
    return this._users.asObservable(); //Converts BehaviorSubject into an Observable
  }

  //Takes a user and returns a promise with a saved user
  addUser(user: User): Promise<User> {
    return new Promise ((resolve, reject) => {
      user.id = this.dataStore.users.length +1; //Sets id to dataStore's length plus 1
      this.dataStore.users.push(user); //Push new user to our internal dataStore
      this._users.next(Object.assign({}, this.dataStore).users); //Ensures our components subscribing to BehaviorSubject gets notified
      resolve(user);
    })
  }

  //Looks up a single user by their id
  userById(id: number) {
    return this.dataStore.users.find(x => x.id == id);
  }

  //Asynchronously fetches user database from link source
  loadAll() {
    const usersUrl = 'https://raw.githubusercontent.com/ajtowf/styling-applications-with-angular-material/refs/heads/main/src/assets/users.json';

    return this.http.get<User[]>(usersUrl) //Get request to pull data into array of User objects
    .subscribe( data => { //Triggers a network request
      this.dataStore.users = data; //Saves to local array cache
      this._users.next(Object.assign({}, this.dataStore).users); //Creates a copy of the dataStore object and pushes it to BehaviorSubject stream
    }, error => {
      console.log("Failed to fetch users"); //Provides some error messaging
    });
  }

}

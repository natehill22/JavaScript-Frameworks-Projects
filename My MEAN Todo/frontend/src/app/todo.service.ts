import { Injectable } from "@angular/core"; //Imports Injectable to use Angular's dependency injection
import { HttpClient } from "@angular/common/http"; //Imports the HttpClient to transmit HTTP requests
import { Observable } from "rxjs"; //Imports observables to help manage async data streaming

//Declares a schema that exactly mirrors the structure of database records
export interface Todo {
    _id?: string;
    title: string;
    isCompleted: boolean;
    createdAt?: Date;
}

//Configures service as a single instance accessible by any app component
@Injectable({ providedIn: 'root' })
export class TodoService {
    //Sets the apiUrl variable to point directly to the express backend port
    private apiUrl = 'http://localhost:5000/api/todos';

    constructor(private http: HttpClient) {} //Injects the HTTP engine into this.http

    //Defines network communication methods for get, add, delete, and edit
    getTodos(): Observable<Todo[]>{
        return this.http.get<Todo[]>(this.apiUrl); //Gets all records (in Todo schema format) from port 5000
    }

    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo); //Adds a record (in Todo schema format) to port 5000, passing data in request body
    }

    deleteTodo(id: string): Observable<void> {
        return this.http.delete<void>( `${this.apiUrl}/${id}` ); //Deletes a record on port 5000, matching the id in the URL path
    }

    updateTodo(id: string, isCompleted: boolean): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, { isCompleted }); //Edits a record's completion states on port 5000, matching the id in the URL path
    }
}
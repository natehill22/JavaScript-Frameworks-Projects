import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Todo {
    _id?: string;
    title: string;
    isCompleted: boolean;
    createdAt?: Date;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
    private apiUrl = 'http://localhost:5000/api/todos';

    constructor(private http: HttpClient) {}

    getTodos(): Observable<Todo[]>{
        return this.http.get<Todo[]>(this.apiUrl);
    }

    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
    }

    deleteTodo(id: string): Observable<void> {
        return this.http.delete<void>( `${this.apiUrl}/${id}` );
    }

    updateTodo(id: string, isCompleted: boolean): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, { isCompleted });
    }
}
import { Component, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TodoService, Todo } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private destroyRef = inject(DestroyRef);

  public todos = signal<Todo[]>([]);
  public newTodoTitle = signal<string>('');
  protected readonly title = signal('Todo Tasks');

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (data) => this.todos.set(data),
      error: (err) => console.error('Could not load records:', err)
    });
  }

  addNewTodo(): void {
    const cleanTitle = this.newTodoTitle().trim();
    if (!cleanTitle) return;

    const newTodo: Todo = { title: cleanTitle, isCompleted: false };

    this.todoService.addTodo(newTodo)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
    next: (savedTodo) => { 
      this.todos.update(currentTodos => [...currentTodos, savedTodo]);
      this.newTodoTitle.set('');
    },
    error: (err) => console.error('Todo creation failed:', err)
  });
  }

  removeTodo(id: string | undefined): void {
    if (!id) return;

    this.todoService.deleteTodo(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => { 
        this.todos.update(currentTodos => currentTodos.filter(t => t._id !== id));
      },
      error: (err) => console.error('Deletion failed:', err)
    });
  }

  toggleTodo(todo: Todo): void {
    if (!todo._id) return;

    const targetId = todo._id;
    // Calculate the inverse state cleanly
    const nextStatus = !todo.isCompleted;

    // 1. Optimistic Update (Immediate UI response)
    this.todos.update(currentTodos => 
      currentTodos.map(t => t._id === targetId ? { ...t, isCompleted: nextStatus } : t)
    );

    // 2. Network Sync
    this.todoService.updateTodo(targetId, nextStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedTodo) => {
          if (!updatedTodo || !updatedTodo._id) {
            console.warn('Backend response was empty, skipping sync.');
            return;
          }

          this.todos.update(currentTodos => 
            currentTodos.map(t => t._id === targetId ? updatedTodo : t)
          );
        },
        error: (err) => {
          console.error('Status toggle failed:', err);
          // Rollback state if network request fails
          this.todos.update(currentTodos => 
            currentTodos.map(t => t._id === targetId ? { ...t, isCompleted: !nextStatus } : t)
          );
        }
      }); 
  } 
}

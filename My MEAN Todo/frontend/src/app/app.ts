import { Component, OnInit, signal, DestroyRef, inject } from '@angular/core'; //Imports builing blocks of angular (as well as state management signals and injection engines)
import { CommonModule } from '@angular/common'; //Imports core Angular-platform directives
import { FormsModule } from '@angular/forms'; //Imports input bindings to track typed data across input fields
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; //Imports a cleanup utility to help with memory leaks

import { TodoService, Todo } from './todo.service'; //Imports backend service and data structure blueprints

@Component({
  selector: 'app-root',
  standalone: true, //Configures component to be self-contained
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

//Declares and exports component class and initialization life-cycle processes
export class App implements OnInit {
  private destroyRef = inject(DestroyRef); //Injects runtime cleanup token to track component life-cycles

  public todos = signal<Todo[]>([]); //Creates a signal to track the array of todo tasks (starting from empty)
  public newTodoTitle = signal<string>(''); //Creates a signal to track the text entered in dashboard input (starting from empty)
  protected readonly title = signal('Todo Tasks'); //Creates a signal to track the title

  constructor(private todoService: TodoService) {} //Injects the service into the component

  //Loads all todos immediately upon startup
  ngOnInit(): void {
    this.loadTodos();
  }

  //Loads all todos
  loadTodos() {
    this.todoService.getTodos() //Fires data fetching query toward port 5000
    .pipe(takeUntilDestroyed(this.destroyRef)) //Closes out of the module if user navigates away
    .subscribe({
      next: (data) => this.todos.set(data), //Updates todos signal with the incoming list
      error: (err) => console.error('Could not load records:', err) //Shows error message and errors, if failed
    });
  }

  //Adds a new todo
  addNewTodo(): void {
    const cleanTitle = this.newTodoTitle().trim(); //Pulls string from input (trimmed of excess end-spaces)
    if (!cleanTitle) return; //Cancels if users try to submit an empty string

    //Builds a new task object matching the schema
    const newTodo: Todo = { title: cleanTitle, isCompleted: false };

    this.todoService.addTodo(newTodo) //Sends the new task data on through a post request
    .pipe(takeUntilDestroyed(this.destroyRef)) //Closes out of the module if user navigates away
    .subscribe({
    next: (savedTodo) => { //When express confirms the new task was saved to mongo, 
      this.todos.update(currentTodos => [...currentTodos, savedTodo]); //Appends the new document
      this.newTodoTitle.set(''); //Clears the newTodoTitle (to make way for the next potential add)
    },
    error: (err) => console.error('Todo creation failed:', err) //Shows error message and errors, if failed
  });
  }

  //Deletes todo
  removeTodo(id: string | undefined): void {
    if (!id) return; //Cancels attempt if no (matching) id can be found 

    this.todoService.deleteTodo(id) //Sends the request call for deletion targeting the record (id)
    .pipe(takeUntilDestroyed(this.destroyRef)) //Closes out of the module if user navigates away
    .subscribe({
      next: () => { 
        this.todos.update(currentTodos => currentTodos.filter(t => t._id !== id)); //Updates todo list with a duplicate array missing the deleted value
      },
      error: (err) => console.error('Deletion failed:', err) //Shows error message and errors, if failed
    });
  }

  //Edits checked state of todo
  toggleTodo(todo: Todo): void {
    if (!todo._id) return; //Cancels attempt if no (matching) id can be found 

    const targetId = todo._id; //Places id context into a variable
    const nextStatus = !todo.isCompleted; //Calculates the tasks completion status when flipped (for ease of use later)

    //Opens update method across active records that track state signals
    this.todos.update(currentTodos => 
      //Forces box to immediately update/flip visually (without waiting for port response)
      currentTodos.map(t => t._id === targetId ? { ...t, isCompleted: nextStatus } : t)
    );

    //Syncs data through the backend (after the frontend change)
    this.todoService.updateTodo(targetId, nextStatus) //Sends the request call for update targeting the record (id)
      .pipe(takeUntilDestroyed(this.destroyRef)) //Closes out of the module if user navigates away
      .subscribe({
        next: (updatedTodo) => { //When database update is successful
          if (!updatedTodo || !updatedTodo._id) { 
            console.warn('Backend response was empty, skipping sync.');
            return; //Cancels attempt if no (matching) id can be found with console warning
          }

          //Opens update method across active records that track state signals
          this.todos.update(currentTodos => 
            //Replaces the temporary visual update with one using a the appropriate mongoDB data
            currentTodos.map(t => t._id === targetId ? updatedTodo : t)
          );
        },
        error: (err) => {
          console.error('Status toggle failed:', err); //Shows error message and errors, if failed
          // Rollback state if network request fails
          this.todos.update(currentTodos => 
            //Reverts the visual checkbox state back to its original state, so users know the change failed to save 
            currentTodos.map(t => t._id === targetId ? { ...t, isCompleted: !nextStatus } : t)
          );
        }
      }); 
  } 
}

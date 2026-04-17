class Model {
    constructor() {
        //The state of the model, an array of todo objects, prepopulated with some data
        this.todos = [
            {id: 1, text: 'Run a marathon', complete: false},
            {id: 2, text: 'Plant a garden', complete: false},
        ]
    }

    addTodo(todoText) {
        const todo = {
            //If list has items, it generates a unique id for a new item. If empty, id = 1
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1, 
            text: todoText, //Task description
            complete: false, //Starts as false because todo is new
        }

        this.todos.push(todo)
    }

    //Map through all todos, and replace the text of the todo with the specified id
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => //Loops through every item in this.todos and checks if id matches
        todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo, //If match, id and complete status are maintained, but old text is replaced with updated
        )
    }

    //Filter a todo out of the array by id
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id)
    }

    //Flip the complete boolean on the specified todo
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => //Loops through every item in this.todos and checks if id matches
          todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo, //If match, complete status gets reversed
        )
    }
}

class View {
    constructor() {

    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View())
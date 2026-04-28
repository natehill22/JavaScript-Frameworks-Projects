class Model {
    constructor() {
        //Pulls state of the model and an array of todo objects from localStorage or an empty todo list
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
    }

    //Sets up a callback mechanism that can be used to update (re-render) changes in todo list
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback
    }

    //Private method to update the value of localStorage as well as the model state
    _commit(todos) {
        this.onTodoListChanged(todos) //Triggers callback function to update UI
        localStorage.setItem('todos', JSON.stringify(todos)) //Saves updated todo list to localStorage (as JSON string)
    }

    addTodo(todoText) {
        const todo = {
            //If list has items, it generates a unique id for a new item. If empty, id = 1
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1, 
            text: todoText, //Task description
            complete: false, //Starts as false because todo is new
        }

        this.todos.push(todo)
        this._commit(this.todos) //Updates new todo list in localStorage and UI
        
    }

    //Map through all todos, and replace the text of the todo with the specified id
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => //Loops through every item in this.todos and checks if id matches
        todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo, //If match, id and complete status are maintained, but old text is replaced with updated

        this._commit(this.todos) //Updates new todo list in localStorage and UI
        )
    }

    //Filter a todo out of the array by id
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)

        this._commit(this.todos) //Updates new todo list in localStorage and UI
    }

    //Flip the complete boolean on the specified todo
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => //Loops through every item in this.todos and checks if id matches
          todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo, //If match, complete status gets reversed

          this._commit(this.todos) //Updates new todo list in localStorage and UI
        )
    }
}

class View {
    constructor() {
        //Setting up all View-based items as variables for easier reference
        this.app = this.getElement('#root') //Root element 

        //App title
        this.title = this.createElement('h1')
        this.title.textContent = 'Todos'

        //Form, with a [type="text"] input, and submit button
        this.form = this.createElement('form')

        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Add todo'
        this.input.name = 'todo'

        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Submit'

        //Visual representation of todo list
        this.todoList = this.createElement('ul', 'todo-list')

        //Append input and submit button to the form
        this.form.append(this.input, this.submitButton)

        //Append title, form, and todo list to the app
        this.app.append(this.title, this.form, this.todoList)

        //Sets up event handlers to detect changes and temporarily holds those changes during todo editing (before they're saved)
        this._temporaryTodoText
        this._initLocalListeners() 
    }

    //Private/iternal methods used to handle user input
    get _todoText() {
    return this.input.value //Retrieves current text typed into input field
    }

    _resetInput() {
        this.input.value = '' //Clears input field immediately after (to prepare for the next task entry)
    }

    //Create a new HTML element with an optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag) //Creates element
        if (className) element.classList.add(className) //Checks if a className is provided, if so, attaches class to element

            return element //Gives back finished element for later use
    }

    //Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector) //Finds first element matching CSS selector

        return element //Returns element, or null if nothing matches
    }

    displayTodos(todos) {
        //Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild) //Clears all existing child elements (todos) from a DOM list
        }

        //Show default message in empty state
        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            //Create todo item list nodes for each todo in state
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id

                //Each todo item will have a toggle-able checkbox
                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                //The todo item text will be in a 'contenteditable' span
                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                //If the todo is complete, it will be struckthrough
                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                } else {
                    //Otherwise just display the text
                    span.textContent = todo.text
                }

                //The todos will also have a delete button
                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)

                //Append nodes to the todo list
                this.todoList.append(li)
            })
        }
    }

    //Listens for changes and, if editable, updates temporary variable with the current input
    _initLocalListeners() {
        this.todoList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText
            }
        })
    }

    //Binds a submit event listener to handle todo additions 
    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault() //Prevents page from reloading upon form submission
        
          if (this._todoText) {
            handler(this._todoText)
            this._resetInput() //Clears input after successful submission
          }
        })
    }

    //Binds a submit event listener to handle todo deletions 
    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id) //Gets specific ID of todo item to be deleted

                handler(id) //Allows controller/model to delete item
            }
        })
    }

    //Binds a submit event listener to handle todo edits 
    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', event => { //Listens for when a user clicks away from the editable element
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id) //Gets specific ID of todo item to be edited

                handler(id, this._temporaryTodoText) //Updates item's data
                this._temporaryTodoText = '' //Resets state to ensure a fresh start for new items
            }
        })
    }

    //Binds a submit event listener to handle todo checkbox toggling 
    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => { //Listens for when a user clicks a todo's checkbox
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id) //Gets specific ID of todo item to be toggled

                handler(id) //Allows controller/model to update checked status
            }
        })
    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        //When todo is added, removed, edited, or toggled, update the view by calling callback function
        this.model.bindTodoListChanged(this.onTodoListChanged)

        //When todo is changed, these functions run (based upon the type of change)
        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindToggleTodo(this.handleToggleTodo)
        this.view.bindEditTodo(this.handleEditTodo)

        //Display initial todos (if present)
        this.onTodoListChanged(this.model.todos)
    }

    //Updates UI whenever data changes
    onTodoListChanged = (todos) => {
        this.view.displayTodos(todos)
    }

    //Handler function to add new todo
    handleAddTodo = (todoText) => {
        this.model.addTodo(todoText)
    }

    //Handler function to edit todo item
    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText)
    }

    //Handler function to delete existing todo
    handleDeleteTodo = (id) => {
        this.model.deleteTodo(id)
    }

    //Handler function to update toggle status of an existing todo
    handleToggleTodo = (id) => {
        this.model.toggleTodo(id)
    }
}

//Turns the app variable into the main controller object, which manages the relationship between model and view
const app = new Controller(new Model(), new View())
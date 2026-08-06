// import storage handler functions
import { retrieve_from_localstorage, save_to_localstorage } from "./storage.js";
// import Todo class for creating todos
import { Todo } from "./todo.js";
// import Toast class for creating and rendering ui toasts
import { Toast } from "./toast.js";

// container for todo html items
const todoItemsContainer = document.querySelector("#todo-list");
// button to add new todos
const addTodoButton = document.querySelector("#add-todo-btn");

// fetch todos from localstorage
let todos = retrieve_from_localstorage();

// logic for adding a new todo
addTodoButton.onclick = () => {
    addTodoButton.classList.toggle("active");
};

// function to render a todo in html
function render_todo(todo) {
    // .todo-item-container base element
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");

    // todo item checkbox
    const todoItemCheckbox = document.createElement("input");
    todoItemCheckbox.classList.add("todo-item-checkbox");
    todoItemCheckbox.setAttribute("type", "checkbox");

    // set checked attribute if todo.isDone true
    todo.isDone ? todoItemCheckbox.setAttribute("checked", "") : "";
    todoItemCheckbox.onchange = () => {
        todo.isDone = !todo.isDone;
        // save todos (sync data)
        save_to_localstorage(todos);
    };

    // .todo-item-details-container base element
    const todoItemDetailsContainer = document.createElement("div");
    todoItemDetailsContainer.classList.add("todo-item-details-container");

    // .todo-icon-display base element
    const todoItemIconDisplay = document.createElement("span");
    todoItemIconDisplay.classList.add("todo-icon-display");
    todoItemIconDisplay.textContent = todo.todoIcon;

    // .todo-item-text-container base element
    const todoItemTextContainer = document.createElement("div");
    todoItemTextContainer.classList.add("todo-item-text-container");

    // .todo-title-display base element
    const todoItemTitleDisplay = document.createElement("span");
    todoItemTitleDisplay.classList.add("todo-title-display");
    // display title of todo in span
    todoItemTitleDisplay.textContent = todo.todoTitle;

    // .todo-description-display base element
    const todoItemDescriptionDisplay = document.createElement("span");
    todoItemDescriptionDisplay.classList.add("todo-description-display");
    // display description of todo in span
    todoItemDescriptionDisplay.textContent = todo.todoDescription;

    // append .todo-title-display and .todo-description-display to .todo-item-text-container
    todoItemTextContainer.append(todoItemTitleDisplay, todoItemDescriptionDisplay);

    // append .todo-icon-display and .todo-item-text-container to .todo-item-details-container
    todoItemDetailsContainer.append(todoItemIconDisplay, todoItemTextContainer);

    // append checkbox and .todo-item-details-container to .todo-item-container
    todoItemContainer.append(todoItemCheckbox, todoItemDetailsContainer);

    // TODO
    // add todo update logic
    // todoItemDetailsContainer.onpointerup = () => {
    //     // display delete button
    //     deleteTodoButton.classList.add("active");
    //     // set text of button to "update"
    //     saveTodoButton.textContent = "update";
    //     // delete todo button logic
    //     deleteTodoButton.onclick = () => {
    //         // delete todo (splice 1 from todo index)
    //         todos.splice(todos.indexOf(todo), 1);
    //         // save todos to localstorage
    //         save_to_localstorage(todos);
    //         // render todos in html again
    //         rerender_todos();
    //     };
    //     // todo icon select logic
    //     todoIconSelect.querySelectorAll("option").forEach(o => {
    //         // select the option with the todo's icon
    //         if (o.value === todo.todoIcon) {
    //             o.selected = true;
    //         };
    //     });
    //     // todo title placeholder logic
    //     todoTitleDisplay.textContent = todo.todoTitle.length > 0 ? todo.todoTitle : "Todo Title";
    //     // todo description placeholder logic
    //     todoDescriptionDisplay.textContent = todo.todoDescription.length > 0 ? todo.todoDescription : "Todo Description";
    //     // save todo logic
    //     saveTodoButton.onclick = () => {
    //         // set todo icon
    //         todo.todoIcon = todoIconSelect.value;
    //         // set todo title
    //         todo.todoTitle = todoTitleDisplay.textContent;
    //         // set todo description
    //         todo.todoDescription = todoDescriptionDisplay.textContent;
    //         // save todos to localstorage
    //         save_to_localstorage(todos);
    //         // render todos in html again
    //         rerender_todos();
    //     };
    //     // display todo dialog/modal
    //     show_todo_dialog();
    // };
    // append .todo-item-container to #todo-list
    todoItemsContainer.appendChild(todoItemContainer);
};

function rerender_todos() {
    // remove all currently displayed todo html items
    document.querySelectorAll(".todo-item-container").forEach(e => {e.remove()});
    // for each todo in todos array
    todos.forEach(todo => {
        // render todo in todo list
        render_todo(todo);
    });
};


// text bar filtering logic

function display_hint_if_search_not_successful() {
    const hint = document.querySelector("#no-search-results-hint");
    if (document.querySelectorAll(".todo-item-container:not(.not-a-search-result)").length < 1) {
        hint.classList.add("active");
    } else {
        hint.classList.remove("active");
    };
};

const searchBarInput = document.querySelector("#search-bar-input");
searchBarInput.addEventListener("input", () => {
    const titles = document.querySelectorAll(".todo-title-display"); // title < text container < details container < todo container
    titles.forEach(title => {
        // if todo doesnt contain searched title
        if (!title.textContent.toLowerCase().includes(searchBarInput.value.toLowerCase())) {
            // hide todo
            title.parentElement.parentElement.parentElement.classList.add("not-a-search-result");
        } else {
            // display todo
            title.parentElement.parentElement.parentElement.classList.remove("not-a-search-result");
        };
        // display hint if there are no search results
        display_hint_if_search_not_successful();
    });
});

function display_length_of_text(displayElement, elementToMonitor) {
    displayElement.textContent = elementToMonitor.value.length;
};

// todo title and description length limitation logic
// required variables
const todoTitleInput = document.querySelector("#todo-title-input");
const todoDescriptionInput = document.querySelector("#todo-description-input");
const todoTitleLengthDisplay = document.querySelector("#todo-title-length-display");
const todoTitleMaxLengthDisplay = document.querySelector("#todo-title-max-length-display");
const todoDescriptionLengthDisplay = document.querySelector("#todo-description-length-display");
const todoDescriptionMaxLengthDisplay = document.querySelector("#todo-description-max-length-display");
const todoIconSelect = document.querySelector("#todo-icon-select");

// button for submitting todo-form (creating a todo)
const submitTodoFormButton = document.querySelector("#submit-todo-form-btn");
// button for resetting todo form
const resetTodoFormButton = document.querySelector("#reset-todo-form-btn");
// form for creating a todo
const todoForm = document.querySelector("#todo-form");

// logic for form reset
resetTodoFormButton.addEventListener("click", () => {
    todoForm.reset();
    display_length_of_text(todoTitleLengthDisplay, todoTitleInput);
    display_length_of_text(todoDescriptionLengthDisplay, todoDescriptionInput);
    todoTitleLengthDisplay.parentElement.classList.remove("limit-reached");
    todoDescriptionLengthDisplay.parentElement.classList.remove("limit-reached");
    new Toast("Form reset.", "information").render();
});

submitTodoFormButton.addEventListener("click", () => {
    // fetch user input
    const todoIcon = todoIconSelect.value;
    const todoTitle = todoTitleInput.value;
    const todoDescription = todoDescriptionInput.value;

    // create new Todo instance with user input as properties
    const newTodo = new Todo(todoIcon, todoTitle, todoDescription);
    // log todo for debugging
    console.log(newTodo);
    // append newly created Todo to the start of the todos array
    todos.unshift(newTodo);
    // save todos in localStorage
    save_to_localstorage(todos);
    // rerender todos in html
    rerender_todos();
    // hide todo form
    addTodoButton.classList.remove("active");
    // display success toast
    new Toast("Todo created.", "success").render();
    // reset form after todo was created
    todoForm.reset();
});

// add maxlength attribute to both inputs (change in HTML and gets changed here)
todoTitleInput.setAttribute("maxlength", todoTitleMaxLengthDisplay.textContent);
todoDescriptionInput.setAttribute("maxlength", todoDescriptionMaxLengthDisplay.textContent);

// display length of textContent
display_length_of_text(todoTitleLengthDisplay, todoTitleInput);
display_length_of_text(todoDescriptionLengthDisplay, todoDescriptionInput);

// todo title limit
todoTitleInput.addEventListener("input", (e) => {
    display_length_of_text(todoTitleLengthDisplay, todoTitleInput);
    if (todoTitleInput.value.length > 0) {
        // limit reached logic
        if (todoTitleInput.value.length >= todoTitleInput.getAttribute("maxlength")) {
            todoTitleLengthDisplay.parentElement.classList.add("limit-reached");
            // display error/warning toast that user reached max limit
            new Toast("Title limit reached.", "error").render();
        } else {
            todoTitleLengthDisplay.parentElement.classList.remove("limit-reached");
        };
        // enable submit button
        submitTodoFormButton.removeAttribute("disabled");
    } else {
        // disable submit button
        submitTodoFormButton.setAttribute("disabled", true);
    };
});

// todo description limit
todoDescriptionInput.addEventListener("input", () => {
    display_length_of_text(todoDescriptionLengthDisplay, todoDescriptionInput);
    // limit reached logic
    if (todoDescriptionInput.value.length >= todoDescriptionInput.getAttribute("maxlength")) {
        // display error/warning toast that user reached max limit
        new Toast("Description limit reached.", "error").render();
        todoDescriptionLengthDisplay.parentElement.classList.add("limit-reached");
    } else {
        todoDescriptionLengthDisplay.parentElement.classList.remove("limit-reached");
    };
});










// render todos in html
rerender_todos();
// save todos to localstorage
save_to_localstorage(todos);
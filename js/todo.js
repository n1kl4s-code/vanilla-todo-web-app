export class Todo {
    constructor(icon, title, description = "-", done = false) {
        this.todoIcon = icon;
        this.todoTitle = title;
        this.todoDescription = description;
        this.isDone = done;
    };
};
import { Todo } from "./todo.js";

// save given data with given key to localstorage
export function save_to_localstorage(data, key = "youHaveTODOit") {
    localStorage.setItem(key, JSON.stringify(data));
};

// retrieve and return data saved in localstorage using given key (if exists)
export function retrieve_from_localstorage(key = "youHaveTODOit") {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [new Todo("🫵", "You have TODO it!", "Just look at the title I guess.", false)];
};
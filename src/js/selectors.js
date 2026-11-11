const date = document.querySelector("time.header__date")
const taskTitle = document.getElementById("task-title")
const addBtn = document.querySelector("button.button__submit")
const clearAllBtn = document.querySelector("button.clear-button")
const allLinks = document.querySelectorAll("ul.filter__list>li")
const emptyTempItem = document.getElementById("temp-empty-list-item")
const newTempItem = document.getElementById("temp-list-item")
const taskList = document.querySelector("ul.todo-app__task-list")
const main = document.querySelector("main.page")
const form = document.querySelector("form.todo-app__form")


export {date, addBtn, clearAllBtn, allLinks, emptyTempItem, newTempItem, taskList, main, taskTitle, form}
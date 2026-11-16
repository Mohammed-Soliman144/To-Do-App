const dateEle = document.querySelector("time.header__date")
const taskTitle = document.getElementById("task-title")
const addBtn = document.querySelector("button.button__submit")
const taskList = document.querySelector("ul.todo-app__task-list")
const allListItems = document.querySelectorAll("ul.filter__list>li")
const emptyTempItem = document.getElementById("temp-empty-list-item")
const newTempItem = document.getElementById("temp-list-item")
const main = document.querySelector("main.page")
const form = document.querySelector("form.todo-app__form")
const remainItemText = document.getElementById("remain-items")

export {dateEle, addBtn, allListItems, emptyTempItem, newTempItem, taskList, main, taskTitle, form, remainItemText}
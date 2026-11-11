import {newTempItem, taskTitle, taskList} from "./selectors.js"

const STORAGE_KEY = "TODO_APP"


export function addNewItem(item = {}) {
    if(!Object.keys(item).length) return
    cloneTemp(newTempItem, taskList)
    initializeItemProps(item)
    addToStorage(item)
    return
}


export function cloneTemp(tempSelector = "", root = "") {
    if(!tempSelector || !root) return
    const temp = tempSelector.content.cloneNode(true)
    root.appendChild(temp)
    return
}


export function initializeItemProps(item) {
    const {id, taskTitle} = item
    const isEmptyItem = document.querySelector("ul.todo-app__task-list li.list-item--empty") ? true : false
    if(isEmptyItem) {
        const emptyItem = document.querySelector("ul.todo-app__task-list li.list-item--empty")
        emptyItem.remove()
    }   
    const recentInput = document.querySelector("ul.todo-app__task-list li.task-list__list-item:last-child input.list-item__input")
    // update name and id of input then label associated with input
    recentInput.closest("li").dataset.itemId = `${id}`
    recentInput.dataset.itemId = `checkbox-${id}`
    recentInput.name = `checkbox-${id}`
    recentInput.id = `checkbox-${id}`

    recentInput.nextElementSibling.htmlFor = `checkbox-${id}`
    recentInput.nextElementSibling.textContent = taskTitle
    return
}

export function addToStorage(item = {}) {
    if(typeof window === "undefined") return
    console.log(item)
    const storage = retrieveFromStorage()
    const isExist = storage.filter(task => task.taskTitle === item.taskTitle).length ? true : false
    if(isExist) return
    console.log(isExist, item)
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...storage, item]))
    return
}

export function retrieveFromStorage() {
    if(typeof window === "undefined") return
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
}


export function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const {["task-title"]: taskTitle} = Object.fromEntries(formData)
    console.log(taskTitle, Object.fromEntries(formData))
    const item = {
        id: Date.now(),
        taskTitle,
        isActive: true,
        isCompleted: false,
        date: new Date().toISOString()
    }
    addNewItem(item)
    e.target.reset()
}

function removeFromStorage(id) {
    if(typeof window === "undefined") return
    const storage = retrieveFromStorage()
    const isExist = storage.filter(task => task.id === id).length ? true : false
    if(!isExist) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...storage.filter(task => task.id !== id)]))
    return
}

export function handleEdit(e) {
    const label = e.target.closest("li.task-list__list-item").querySelector("label.list-item__label").textContent
    taskTitle.value = label
    label.style.color = "var(--color-primary)"
    taskTitle.style.color = "var(--color-primary)"
}

export function handleDelete(e) {
    const listItem = e.target.closest("li")
    removeFromStorage(parseInt(listItem.dataset.itemId))
    listItem.remove()
    return
}
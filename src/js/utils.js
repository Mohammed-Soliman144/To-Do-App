import {newTempItem, taskTitle, taskList, allListItems} from "./selectors.js"
import { addToState, retrieveState } from "./state.js"

const STORAGE_KEY = "TODO_APP"


export function addNewItem(item = {}) {
    if(!Object.keys(item).length) return
    cloneTemp(newTempItem, taskList)
    initializeItemProps(item)
    addToState(item)
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
    const listItem = recentInput.closest("li")
    listItem.dataset.itemId = `${id}`
    listItem.dataset.isActive = `${!recentInput.checked}`
    listItem.dataset.isCompleted = `${recentInput.checked}`
    recentInput.closest("li").dataset.itemId = `${id}`
    recentInput.dataset.itemId = `checkbox-${id}`
    recentInput.name = `checkbox-${id}`
    recentInput.id = `checkbox-${id}`
    // if(recentInput.checked && recentInput.style.)

    recentInput.nextElementSibling.htmlFor = `checkbox-${id}`
    recentInput.nextElementSibling.textContent = taskTitle
    return
}

export function addToStorage(item = {}) {
    if(typeof window === "undefined") return
    console.log(item)
    const storage = retrieveFromStorage()
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
    const item = {
        id: Date.now(),
        taskTitle,
        isActive: true,
        isCompleted: false,
        date: new Date().toISOString()
    }
    console.log(retrieveState())
    addNewItem(item)
    moveToActiveTab()
    checkCheckedItems()
    filterItems()
    console.log(retrieveState())
    e.target.reset()
}

function moveToActiveTab() {
    for(const item of allListItems) {
        item.setAttribute("aria-current", "false")
        item.querySelector("a").classList.remove("link--active")
    }
    const activeItem = [...allListItems].find(item => item.querySelector("a").textContent === "active")
    activeItem.querySelector("a").classList.add("link--active")
    activeItem.setAttribute("aria-current", "true")
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
    const label = e.target.closest("li.task-list__list-item").querySelector("label.list-item__label")
    taskTitle.value = label.textContent
    label.style.color = "var(--color-primary)"
    taskTitle.style.color = "var(--color-primary)"
}

export function handleDelete(e) {
    const listItem = e.target.closest("li")
    removeFromStorage(parseInt(listItem.dataset.itemId))
    listItem.remove()
    taskTitle.textContent = ""
    taskTitle.style.color = ""
    return
}

export function handleCheck(e) {
    const listItem =e.target.closest("li.task-list__list-item")
    listItem.dataset.isActive = !e.target.checked
    listItem.dataset.isCompleted = e.target.checked
    const id = parseInt(e.target.closest("li.task-list__list-item").dataset.itemId)
    const taskTitle = e.target.nextElementSibling.textContent
    const isActive = !e.target.checked
    const isCompleted = e.target.checked
    const item = {
        id,
        taskTitle,
        isActive,
        isCompleted
    }
    filterItems()
    updateStorage(item)
}

export function updateStorage(item) {
    if(typeof window === "undefined") return
    const storage = retrieveFromStorage()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...storage.map(task => task.id === item.id? {...task, isActive: item.isActive,isCompleted: item.isCompleted, taskTitle: item.taskTitle} : task)]))
    return
}

function filterItems() {
    const isAll = [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "all") ? true : false
    const isActive = [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "active") ? true : false
    const isCompleted = [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "completed") ? true : false
    console.log([...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "all"), [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "active"), [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "completed"))
    if(isAll) 
        filterAllItems()
    else if(isActive)
        filterActiveItems()
    else if(isCompleted){
        filterCompletedItems()
    }       
}

export function filterActiveItems() {
    const allItems = taskList.querySelectorAll("li")
    for(const listItem of allItems) 
        listItem.dataset.isCompleted === 'true'?  
            listItem.style.display = "none" : listItem.style.display = "flex"
}

export function checkCheckedItems() {
    const allItems =  taskList.querySelectorAll("li")
    for(const item of allItems){
        if(item.dataset.isCompleted === "true"){
            console.log(item.querySelector("input").checked)
            item.querySelector("input").checked = true
            // console.log(item.querySelector("input").checked)
        }
    }
}


export function filterCompletedItems() {
    const allItems = taskList.querySelectorAll("li")
    for(const listItem of allItems)
        listItem.dataset.isActive === 'true'?  listItem.style.display = "none" : listItem.style.display = "flex"
}

export function filterAllItems() {
    const allItems = taskList.querySelectorAll("li")
    for(const listItem of allItems)
        listItem.style.display = "flex"
}

export function handleFilter(e) {
    console.log(e.target)
    const allListItems = e.target.closest("ul").querySelectorAll("li")
    const listItem = e.target.closest("li") 
    const link = e.target 
    const isAll = link.textContent === "all"
    const isActive = link.textContent === "active"
    const isCompleted = link.textContent === "completed"
    allListItems.forEach(item => {
        item.querySelector("a.list-item__link").classList.remove("link--active")
        item.setAttribute("aria-current", "false")
    })
    link.classList.add("link--active")
    listItem.setAttribute("aria-current", "true")
    if(isAll)
        filterAllItems()
    else if(isActive)
        filterActiveItems()
    else if(isCompleted)
        filterCompletedItems()
}

export function handleClearAll() {
    const allItems = taskList.querySelectorAll("li")
    if(!allItems.length || typeof window === "undefined") return
    for(const listItem of allItems) {
        if(listItem.dataset.isCompleted === 'true'){
            removeFromStorage(parseInt(listItem.dataset.itemId))
            listItem.remove()
        }
    }
}
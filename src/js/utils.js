import {newTempItem, emptyTempItem, taskTitle, taskList, allListItems, remainItemText, form, addBtn, dateEle} from "./selectors.js"
import { addToState, removeFromState, retrieveState, updateState } from "./state.js"

const STORAGE_KEY = "TODO_APP"

export function addToStorage(item = {}) {
    if(typeof window === "undefined") return
    const storage = retrieveFromStorage()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...storage, item]))
    return
}

export function retrieveFromStorage() {
    if(typeof window === "undefined") return
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
}

function removeFromStorage(id) {
    if(typeof window === "undefined") return
    const storage = retrieveFromStorage()
    const isExist = storage.filter(task => task.id === id).length ? true : false
    if(!isExist) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...storage.filter(task => task.id !== id)]))
    return
}

export function updateStorage(item) {
    if(typeof window === "undefined") return
    const storage = retrieveFromStorage()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...storage.map(task => task.id === item.id? {...task, isActive: item.isActive,isCompleted: item.isCompleted, taskTitle: item.taskTitle} : task)]))
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
    const lastItem = taskList.querySelector("li:last-child")
    lastItem.dataset.itemId = `${id}`
    const checkInput = lastItem.querySelector("input")
    checkInput.name = `checkbox-${id}`
    checkInput.id = `checkbox-${id}`
    checkInput.checked = item.isCompleted
    const label = checkInput.nextElementSibling
    label.htmlFor = `checkbox-${id}`
    label.textContent = taskTitle
    return
}

export function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const {["task-title"]: taskTitle} = Object.fromEntries(formData)
    const isEdit = e.target.querySelector("input[name=task-title]").dataset.itemId ? true : false
    if(isEdit) {
        const textInput = e.target.querySelector("input[name=task-title]")
        const id = parseInt(textInput.dataset.itemId)
        const isCompleted = textInput.dataset.isCompleted === "true" ? true : false 
        const submitIcon = `<svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="button__icon icon plus-icon" aria-hidden="true" focusable="false">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>`
        const updateItem = {
            id,
            isCompleted,
            isActive: !isCompleted,
            taskTitle
        }
        updateState(updateItem)
        updateStorage(updateItem)
        moveToTab()
        addBtn.innerHTML = submitIcon
        addBtn.setAttribute("aria-label", "add new task")
        return
    }
    const item = {
        id: Date.now(),
        taskTitle,
        isActive: true,
        isCompleted: false,
        date: new Date().toISOString()
    }
    // clone new li and append to ul
    cloneTemp(newTempItem, taskList)
    // initialize last li by item
    initializeItemProps(item)
    // update app state
    addToState(item)
    // update storage 
    addToStorage(item)
    // update ui => ul by items (li) according to current tab (all|active|completed)
    moveToTab()
    // update Active items
    setItemsCount()
    // reset form
    e.target.reset()
}

export function filterItems(isAll, isCompleted, isActive) {
    const activeList = retrieveState().filter(item => item.isActive === true)
    const completedList = retrieveState().filter(item => item.isCompleted === true)
    // const allList = retrieveState().filter(item => item.isCompleted === true || item.isActive === true)
    const allList = retrieveState()
    // remove all old items then initialize by last fresh update items in state (Single source of truth)
    taskList.querySelectorAll("li").forEach(item => item.remove())
    // add Empty Item if completedItems is emplty or allitem is empty
    addEmptyItem()
    if(isActive)
        for(const item of activeList) {
            cloneTemp(newTempItem, taskList)
            initializeItemProps(item)
        }
    else if(isCompleted)
        for(const item of completedList) {
            cloneTemp(newTempItem, taskList)
            initializeItemProps(item)
        }
    else if(isAll) 
        for(const item of allList) {
            cloneTemp(newTempItem, taskList)
            initializeItemProps(item)
        }
}

export function handleCheck(e) {
    const checkInput = e.target
    const id = parseInt(checkInput.closest("li").dataset.itemId)
    const updateItem = retrieveState().find(item => item.id === id)
    updateItem.isActive = !e.target.checked
    updateItem.isCompleted = e.target.checked
    // update state
    updateState(updateItem)
    // update storage
    updateStorage(updateItem)
    // Move tab
    moveToTab()
    // update Active items
    setItemsCount()
}

function moveToTab() {
    const isAll = [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "all") ? true : false
    const isActive = [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "active") ? true : false
    const isCompleted = [...allListItems].find(item => item.getAttribute("aria-current") === "true" && item.querySelector("a.link--active").textContent === "completed") ? true : false
    filterItems(isAll, isCompleted, isActive)       
}

export function handleDelete(e) {
    const item = e.target.closest("li")
    const id = parseInt(item.dataset.itemId)
    // remove from state
    removeFromState(id)
    // remove from storage
    removeFromStorage(id)
    // update item count
    setItemsCount()
    // remove from DOM
    item.remove()
    // check clear empty item
    addEmptyItem()
    return
}

export function clearCompletedItems() {
    const completedItems = retrieveState().filter(item => item.isCompleted === true)
    const remainItems = retrieveState().filter(item => item.isCompleted !== true)
    // remove all items
    taskList.querySelectorAll("li").forEach(li => li.remove())
    // update state and storage
    for(const item of completedItems){
        const id = item.id
        removeFromState(id)
        removeFromStorage(id)
    }
    // update DOM by remain items
    for(const item of remainItems) {
        cloneTemp(newTempItem, taskList)
        initializeItemProps(item)
    }
    moveToTab()
    // update Active items
    setItemsCount()
}

export function handleNavigation(e) {
    const linkTab = e.target 
    const allItems = e.target.closest("ul").querySelectorAll("li")
    const item = e.target.closest("li") 

    allItems.forEach(link => {
        link.querySelector("a.list-item__link").classList.remove("link--active")
        link.setAttribute("aria-current", "false")
    })
    linkTab.classList.add("link--active")
    item.setAttribute("aria-current", "true")
    // move to track track aria-current=true and a.link--active
    moveToTab()
}

export function addEmptyItem() {
    const currentTab = [...allListItems].find(item => item.getAttribute("aria-current") === "true").querySelector("a")?.textContent
    const isAll = currentTab === "all"
    const isActive = currentTab === "active"
    const isCompleted = currentTab === "completed"
    const allItems = retrieveState()
    const activeItems = allItems.filter(item => item.isActive === true)
    const completedItems = allItems.filter(item => item.isCompleted === true)
    if(isAll && !allItems.length || isActive && !activeItems.length  || isCompleted && !completedItems.length)
        cloneTemp(emptyTempItem, taskList)
    form.reset()
}

function clearEmptyItem() {
    const allItems = retrieveState()
    if(!allItems.length) return
    const emptyItem = document.querySelector("li.list-item--empty")
    emptyItem?.remove()
}

export function initializeApp() {
    const allItems = retrieveFromStorage()
    if(!allItems.length)
        clearEmptyItem()
    // update state
    for(const item of allItems)
        addToState(item)
    // update DOM
    moveToTab()
    // update Date using Internationization Ecmascript API
    const date = new Date()
    const today = new Intl.DateTimeFormat("en-us", {
        weekday: "long",
        month: "long",
        day: "2-digit"
    }).format(date)
    dateEle.textContent = today
    dateEle.setAttribute("datetime", new Date().toLocaleDateString())
    // update Active items
    setItemsCount()
}

export function handleEdit(e) {
    const label = e.target.closest("li.task-list__list-item").querySelector("label.list-item__label")
    const id = e.target.closest("li.task-list__list-item").dataset.itemId
    const isCompleted = e.target.closest("li.task-list__list-item").querySelector("input").checked
    taskTitle.value = label.textContent
    taskTitle.dataset.itemId = id 
    taskTitle.dataset.isCompleted = isCompleted
    label.style.color = "var(--color-primary)"
    taskTitle.style.color = "var(--color-primary)"
    const editIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="button__icon icon plus-icon"
            aria-hidden="true"
            focusable="false">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
    `
    addBtn.innerHTML = editIcon
    addBtn.setAttribute("aria-label", "update task")
    taskTitle.focus()
}

function setItemsCount() {
    // update Active items
    const activeItems = retrieveState().filter(item => item.isActive === true).length
    remainItemText.textContent = activeItems
}
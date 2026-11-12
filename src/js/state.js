/* [{id, taskTitle, date, isCompleted, isActive }] */

let appState = []

export function addToState(item = {}) {
    if(!Object.keys(item).length) return
    const isExist = appState.filter(task => task.id === item.id).length ? true : false
    if(isExist) return
    appState = [...appState, item]
}

export function retrieveState() {
    return appState
}

export function updateState(item = {}) {
    if(!Object.keys(item).length) return
    const {taskTitle, isCompleted, isActive} = item
    appState = [...appState.map(task => task.id === item.id? {...task, taskTitle, isCompleted, isActive}: task)]
}

export function removeFromState(itemId) {
    if(!itemId) return
    appState = [...appState.filter(task => task.id !== itemId)]
}

export function getActiveItems() {
    return appState.filter(task => task.isActive === true)
}

export function getCompletedItems() {
    return appState.filter(task => task.isCompleted === true)
}

export function resetState() {
    if(!appState.length) return
    appState = []
}
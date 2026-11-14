import {form, main} from "./selectors.js"
import {handleSubmit, handleEdit, handleDelete, handleNavigation, handleCheck, clearCompletedItems, initializeApp} from "./utils.js"


form.addEventListener("submit", handleSubmit)

document.addEventListener("DOMContentLoaded", initializeApp)

main.addEventListener("click", (e) => {
    const checkedBtn = e.target.closest("input.list-item__input")
    const editBtn = e.target.closest("button.button__edit")
    const deleteBtn = e.target.closest("button.button__delete")
    const linkBtn = e.target.closest("li.filter__list-item a.list-item__link")
    const clearBtn = e.target.closest("button.footer__button.clear-button")

    if(editBtn) 
        handleEdit(e)
    else if(deleteBtn)
        handleDelete(e)
    else if (checkedBtn)
        handleCheck(e)
    else if(linkBtn) 
        handleNavigation(e)
    else if(clearBtn)
        clearCompletedItems()
})
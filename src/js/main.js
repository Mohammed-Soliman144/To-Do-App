import {form, main} from "./selectors.js"
import { retrieveState } from "./state.js"
import {handleSubmit, handleEdit, handleDelete, handleCheck, handleFilter, checkCheckedItems, handleClearAll} from "./utils.js"


form.addEventListener("submit", handleSubmit)

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
    else if (checkedBtn) {
        handleCheck(e)
    }
    else if(linkBtn) {
        handleFilter(e)
        checkCheckedItems()
    } else if(clearBtn) {
        handleClearAll()
    }
})


console.log(retrieveState())
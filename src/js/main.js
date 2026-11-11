import {form, main} from "./selectors.js"
import {handleSubmit, handleEdit, handleDelete} from "./utils.js"


form.addEventListener("submit", handleSubmit)

main.addEventListener("click", (e) => {
    const editBtn = e.target.closest("svg.button__icon.icon.edit-icon")
    const deleteBtn = e.target.closest("svg.button__icon.icon.delete-icon")

    console.log(editBtn, deleteBtn)
    if(editBtn) 
        editBtn.addEventListener("click", handleEdit)
    if(deleteBtn)
        deleteBtn.addEventListener("click", handleDelete)
})



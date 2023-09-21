import { showRecipes, displaySearch } from "./displayRecipe-array.js"

// Creation du html des boutons 
function createHtmlElement(uniqueElements, dataList, inputList){
    // const rechercheTag = document.createElement('input')
    // rechercheTag.classList = 'input_recherche_tag_' + dataList.id
    // rechercheTag.id = dataList.id.slice(5, 16)
    // dataList.appendChild(rechercheTag)
    uniqueElements.forEach((element, i) => {
        const list = document.createElement('li')
        const buttons = document.createElement('button')
        buttons.classList.add('dropdown-item')
        list.value = [i]
        buttons.textContent = element
        list.appendChild(buttons)
        dataList.appendChild(list)
    })
}

// Création du Html du tag, à ajouté sous les listes
function tagHtml(recipes, button){
    const conteneurFormulaire = document.querySelector('.forms_container')
    const buttonTag = document.createElement('button')
    buttonTag.classList = 'btn-close', 'show'
    buttonTag.type = 'button'
    buttonTag.textContent = button
    conteneurFormulaire.appendChild(buttonTag)

    return conteneurFormulaire
}

export { createHtmlElement, tagHtml }
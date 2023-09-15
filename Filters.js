import { rechercheParTag } from "./algo_methode_array.js"
import { showRecipes, displaySearch } from "./displayRecipe.js"
import { createHtmlElement, tagHtml } from "./filters-factory.js"

function filtersFactory(recipes, input) {
    // Créer une constante avec flatMap opur pouvoir l'utiliser dans la fonction extractELements
    const mappedIngredient = recipes.flatMap(recipes => recipes.ingredients)

    // On defini les différentes listes qu'on remet à zéro à la lecture de la fonction
    const dataListIngredients = document.querySelector('#list-ingredients')
    const dataListUstensiles = document.querySelector('#list-ustensils')
    const dataListAppareils = document.querySelector('#list-appliance')
    dataListIngredients.innerHTML = ''
    dataListUstensiles.innerHTML = ''
    dataListAppareils.innerHTML = ''
  
    // On appelle les fonctions qui vont créer les listes
    const extractElementsIngredients = extractElements(recipes, 'ingredient', dataListIngredients, mappedIngredient)
    const extractElementsUstensils = extractElements(recipes, 'ustensils', dataListUstensiles)
    const extractElementsAppliance = extractElements(recipes, 'appliance', dataListAppareils) 
    
    // On defini les différentes input des listes 
    const inputIngredients = document.querySelector('#ingredients')
    const inputUstensiles = document.querySelector('#ustensils')
    const inputAppareils = document.querySelector('#appliance')

    // On appelle les ecouteurs
    addEventListenerToDropdownItems(recipes, dataListIngredients)
    addEventListenerToDropdownItems(recipes, dataListUstensiles)
    addEventListenerToDropdownItems(recipes, dataListAppareils)

    // On appelle les ecouteurs des inputs des listes
    addEventListenerInputs(extractElementsIngredients, dataListIngredients, inputIngredients)
    addEventListenerInputs(extractElementsUstensils, dataListUstensiles, inputUstensiles)
    addEventListenerInputs(extractElementsAppliance, dataListAppareils, inputAppareils)
}

// création des listes en fonction des données reçues
function extractElements(recipes, type, datalist, mappedIngredient){
    const uniqueElements = []
    if (type === 'ingredient') {
        const justIngredients = mappedIngredient.flatMap(recipe => recipe[type].toString().toLowerCase())
        justIngredients.forEach(element => {
            if(!uniqueElements.includes(element))
            uniqueElements.push(element)
        })
    } else{
        const elements = recipes.flatMap(recipe => recipe[type])
        elements.forEach(element => {
            const lowerCasedElement = element.toString().toLowerCase()
            if(!uniqueElements.includes(lowerCasedElement)){
                uniqueElements.push(lowerCasedElement)
            }
        })
    }
    createHtmlElement(uniqueElements, datalist)
    return uniqueElements
}


// Creation d'un fonction pour factoriser les Listeners sur les listes 
function addEventListenerToDropdownItems(recipes, dataList) {
    dataList.querySelectorAll('.dropdown-item').forEach(button => {
        button.addEventListener('click', () => {
            const selectedIngredient = button.textContent
            console.log(selectedIngredient)
            // Exécutez la recherche avec l'element sélectionné
            const resultatRecherche = rechercheParTag(recipes, selectedIngredient)
            // Mettez à jour l'affichage des recettes avec les nouvelles recettes filtrées
            showRecipes(resultatRecherche)
            filtersFactory(resultatRecherche)
            tagHtml(resultatRecherche, selectedIngredient)
        })
    })
}


// Fonction ecoute les inputs pour trier la liste des ingredients, appareils, ustensiles
function addEventListenerInputs(uniqueElements, datalist, inputDataList) {
    inputDataList.addEventListener('input', () => {
        const valueOfinputDataList = inputDataList.value
        if (valueOfinputDataList.length >= 3) {
            const filteredElements = uniqueElements.filter((element) => {
                return element.toLowerCase().includes(valueOfinputDataList);
            })
            datalist.innerHTML = ''
           // Mettre à jour l'affichage de la liste avec les éléments filtrés
           createHtmlElement(filteredElements, datalist)
            
           // Réaffecter les écouteurs
           addEventListenerToDropdownItems(uniqueElements, datalist)
        } else if(valueOfinputDataList.length == 0) {
            createHtmlElement(uniqueElements, datalist)
        }
    })
}









export { filtersFactory }
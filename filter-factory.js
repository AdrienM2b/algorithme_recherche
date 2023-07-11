function filtersFactory(recipes) {
    // const 'créer une constante avec flatMap opur pouvoir l'utiliser dans la fonction extractELements
    const mappedIngredient = recipes.flatMap(recipe => recipe.ingredients)

    // Get references to the datalists
    const dataListIngredients = document.querySelector('#select-ingredients')
    const dataListUstensiles = document.querySelector('#list-ustensils')
    const dataListAppareils = document.querySelector('#list-appliance')
  
    // Call extractElements for each type
    extractElements(recipes, 'ingredient', dataListIngredients, mappedIngredient)
    extractElements(recipes, 'ustensils', dataListUstensiles)
    extractElements(recipes, 'appliance', dataListAppareils)
}

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
}

function createHtmlElement(uniqueElements, dataList){
    uniqueElements.forEach(element => {
        const optionDatalist = document.createElement('option')
        optionDatalist.value = element
        optionDatalist.textContent = element
        dataList.appendChild(optionDatalist)
      })
}
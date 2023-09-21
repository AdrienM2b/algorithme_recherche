function recherchePrincipale(data, input){
    reduireLesLists(data, input)
    // initialisation du nouveau tableau qui va accueuillir les datas triées
    const resultatRechcerche = []

    // Tous les résultats du tri sont transformés en minuscules pour éviter les différences de casse
    // const inputLowerCase = input.toLowerCase()
    for (const recette of data) {
        // On transforme les données en tableau avec flatMap 
        const lowerCaseIngredients = recette.ingredients.flatMap(recipe => recipe.ingredient.toString().toLowerCase())
        const lowerCaseTitre = recette.name.toString().toLowerCase()
        const lowerCaseDescription = recette.description.toString().toLowerCase()
        // condition d'affichage des recettes en fonction du tri
        if(lowerCaseIngredients.includes(input) || lowerCaseTitre.includes(input) || lowerCaseDescription.includes(input)){
                resultatRechcerche.push(recette)
        }
    }
    
    return resultatRechcerche
}

function rechercheParTag(data, input){
    // initialisation du nouveau tableau qui va accueuillir les datas triées
    const resultatRechcercheParTag = []

    // Tous les résultats du tri sont transformés en minuscules pour éviter les différences de casse
    // const inputLowerCase = input.toLowerCase()
    for (const recette of data) {
        const lowerCaseIngredients = recette.ingredients.flatMap(recipe => recipe.ingredient.toString().toLowerCase())
        const lowerCaseUstensiles = recette.ustensils.toString().toLowerCase()
        const lowerCaseAppliance = recette.appliance.toString().toLowerCase()
        // condition d'affichage des recettes en fonction du tri
        if(lowerCaseIngredients.includes(input) || lowerCaseUstensiles.includes(input) || lowerCaseAppliance.includes(input)){
            resultatRechcercheParTag.push(recette)
        }
    }
    
    return resultatRechcercheParTag
}
export { recherchePrincipale, rechercheParTag }

function reduireLesLists(data, input){
    const ingredientList = data.reduce((acc, currentRecipe) => acc.includes(currentRecipe.ingredients.ingredient) ? acc : acc.concat(currentRecipe.ingredients.ingredient), []) 
    console.log(ingredientList)
}
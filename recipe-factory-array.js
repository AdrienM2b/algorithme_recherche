function recipesFactory(data){
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = data

    function recipesDesign(){
        // card de la recette
        const recipeContainer = document.createElement('article')
        recipeContainer.classList.add('card-sm')
        recipeContainer.classList.add('rounded-4')
        recipeContainer.classList.add('recipe-container')

        // L'image
        const mediaRecipe = document.createElement('img')
        mediaRecipe.classList.add('card-img-top')
        mediaRecipe.classList.add('rounded-4')
        mediaRecipe.classList.add('rounded-bottom-0')
        mediaRecipe.classList.add('recipe-media')
        
        let URLImage = ''
        const baseURLImage = '/Photos P7 JS Les petits plats'
        id < 10 ? URLImage = baseURLImage + `/Recette0` + id + `.jpg` : URLImage = baseURLImage + `/Recette` + id + `.jpg`
        mediaRecipe.setAttribute('src', URLImage)

        // contenu de la recette 
        const recipeContent = document.createElement('div')
        recipeContent.classList.add('card-body')
        recipeContent.classList.add('recipe-content')

        // titre de la recette
        const recipeTitle = document.createElement('h2')
        recipeTitle.classList.add('card-title')
        recipeTitle.classList.add('recipe-content_title')
        recipeTitle.textContent = name

        // conteneur de la descritption
        const recipeDescription = document.createElement('div')
        recipeDescription.classList.add('recipe-content-descritpion')

        // titre de la recette
        const recipeTextTitle = document.createElement('h3')
        recipeTextTitle.textContent = 'Recette'
        recipeTextTitle.style.font = 'uppercase'

        // couper le texte 
        function truncate(str, maxlength) {
            return (str.length > maxlength) ?
              str.slice(0, maxlength - 1) + '…' : str;
        }

        // descritpion de la recette 
        const recipeText = document.createElement('p')
        recipeText.classList.add('card-text')
        recipeText.classList.add('recipe-content_text')
        recipeText.textContent = truncate(description, 181)

        // conteneur du titre et des ingredients
        const recipeIngredients = document.createElement('div')
        recipeIngredients.classList.add('recipe-content-ingredients')

        // titre Ingredients 
        const recipeIngredientsTitle = document.createElement('h3')
        recipeIngredientsTitle.textContent = 'Ingrédients'
        recipeIngredientsTitle.style.font = 'uppercase'

        // conteneur des ingredients
        const ingredientsListContainer = document.createElement('div')
        ingredientsListContainer.classList.add('card-text')
        ingredientsListContainer.classList.add('recipe-content_container-ingredients')

        ingredients.forEach(listIngredients => {
            let list = listIngredients.ingredient
            let quantity = listIngredients.quantity ? listIngredients.quantity : ''
            let unit = listIngredients.unit ? listIngredients.unit: ''
            let nameIngredients = document.createElement('p')
            nameIngredients.classList.add('name-ingredients')
            nameIngredients.textContent = list

            let quantityIngredients = document.createElement('p')
            quantityIngredients.classList.add('quantity-ingredients')
            quantityIngredients.textContent = quantity + unit

            nameIngredients.appendChild(quantityIngredients)
            ingredientsListContainer.appendChild(nameIngredients)
        })
        

        recipeDescription.appendChild(recipeTextTitle)
        recipeDescription.appendChild(recipeText)
        recipeContent.appendChild(recipeTitle)
        recipeContent.appendChild(recipeDescription)

        recipeIngredients.appendChild(recipeIngredientsTitle)
        recipeIngredients.appendChild(ingredientsListContainer)

        recipeContainer.appendChild(mediaRecipe)
        recipeContainer.appendChild(recipeContent)
        recipeContainer.appendChild(recipeIngredients)

        return recipeContainer
    }
    
    return  { id, servings, appliance, ustensils, ingredients, recipesDesign}
}

export { recipesFactory }
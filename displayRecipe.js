async function getData() {
    let reponse = await fetch('recipes.json');
    let recipes = (await reponse).json();
    // bien retourner les tableaux une fois récupéré
    return recipes;
}

async function showRecipes(recipes){
    const mainPage = document.querySelector('main')
    recipes.forEach(datas => {
        const getRecipeFact = recipesFactory(datas)
        const showTheRecipes = getRecipeFact.displayRecipes()
        mainPage.appendChild(showTheRecipes)
    });   
    const media = document.querySelectorAll('.recipe-media')
    media.forEach((medias, i) => {
        let URLImage = ''
        const baseURLImage = '/Photos P7 JS Les petits plats'
        recipes[i].id < 10 ? URLImage = baseURLImage + `/Recette0` + recipes[i].id + `.jpg` : URLImage = baseURLImage + `/Recette` + recipes[i].id + `.jpg`
        medias.setAttribute('src', URLImage)
    })
    // const listOfIngredients = document.querySelectorAll('.recipe-content_container-ingredients')
    // listOfIngredients.forEach((ingredients, i) => {
    //     let listIngredients = recipes[i].ingredients
    //     for(i = 0; i < listIngredients.length; i++){
    //         let text = document.createElement('p')
    //         text.textContent = listIngredients[i].ingredient


    //         let quantity = document.createElement('p')
    //         quantity.textContent = listIngredients[i].quantity
    //         ingredients.appendChild(text)
    //     }
    // })
    
}


async function init(){
    const {recipes} = await getData()
    showRecipes(recipes)
}
init()
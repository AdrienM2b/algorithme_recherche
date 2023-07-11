async function getData() {
    let reponse = await fetch('recipes.json');
    let recipes = (await reponse).json();

    return recipes;
}


async function showRecipes(recipes){

    // affichage des cards
    const cardContainer = document.querySelector('#card_container')
    recipes.forEach(datas => {
        const getRecipeFact = recipesFactory(datas)
        const showTheRecipes = getRecipeFact.displayRecipes()
        cardContainer.appendChild(showTheRecipes)
    })
    
    // affichage des images
    const media = document.querySelectorAll('.recipe-media')
    media.forEach((medias, i) => {
        let URLImage = ''
        const baseURLImage = '/Photos P7 JS Les petits plats'
        recipes[i].id < 10 ? URLImage = baseURLImage + `/Recette0` + recipes[i].id + `.jpg` : URLImage = baseURLImage + `/Recette` + recipes[i].id + `.jpg`
        medias.setAttribute('src', URLImage)
    })
    filtersFactory(recipes)
}


async function init(){
    const {recipes} = await getData()
    showRecipes(recipes)
}
init()

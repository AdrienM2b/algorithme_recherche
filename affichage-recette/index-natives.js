import { displaySearch } from '../affichage-recette/displayRecipe-natives.js';


async function getData() {
    let reponse = await fetch('recipes.json');
    let recipes = (await reponse).json();

    return recipes;
}

const cardContainer = document.querySelector('#card_container')

async function init(){
    const {recipes} = await getData()
    displaySearch(recipes)
}
init()











// async function nbrOfRecipes (){
//     // compter le nombre de recette
//     const afficherNbrRecette = document.querySelector('.nbr_de_recette')
//     const nbrRecette = document.querySelectorAll('article')
//     let nbr = 0
//     nbrRecette.forEach(nombreArticle =>{
//         nbr += 1
//         afficherNbrRecette.textContent = nbr + ` recettes`
//     })

//     return nbr
// }

// async function afficherResultatRecherche(recipes){
//     const valueInput = document.querySelector('.form-control')
//     valueInput.addEventListener('keypress', ()=>{
//         const critereRecherche = valueInput.value.toLowerCase()
//         const resultatRecherche = recherchePrincipale(recipes, critereRecherche)
//         console.log(critereRecherche.length)
//         if(critereRecherche.length >= 2){
//             cardContainer.innerHTML = ''
//             showRecipes(resultatRecherche)
//             nbrOfRecipes()
//         } else if(critereRecherche.length < 3){
//             cardContainer.innerHTML = ''
//             showRecipes(recipes)
//             nbrOfRecipes()
//         }
//     })
//     nbrOfRecipes().then(nbr => {
//         console.log(nbr)
//         if(nbr < 3){
//             console.log('toto')
//             cardContainer.style.marginRight = '36%'
//         }else {
//             cardContainer.style.marginRight = ''
//             }
//     })
// }




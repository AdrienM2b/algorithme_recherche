import { displaySearch } from '../affichage-recette/displayRecipe.js';

async function getData() {
  let reponse = await fetch('recipes.json');
  let recipes = (await reponse).json();

  return recipes;
}

async function init() {
  const { recipes } = await getData();
  displaySearch(recipes);
}
init();

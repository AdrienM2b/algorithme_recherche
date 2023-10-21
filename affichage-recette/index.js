<<<<<<< HEAD
import { displaySearch } from '../affichage-recette/displayRecipe.js';

async function getData() {
  let reponse = await fetch('recipes.json');
  let recipes = (await reponse).json();

  return recipes;
}

async function init() {
  const { recipes } = await getData();
  displaySearch(recipes);
=======
import { displaySearch } from './displayRecipe.js';
import {
  addListenerToIndex,
  listenSearchInput,
} from '../utils-filters/listeners.js';
import { recettes } from '../recipes.js';

export const searchParams = {
  inputSearch: '',
  tags: [],
};

async function init() {
  displaySearch(recettes);
  addListenerToIndex(recettes);
  listenSearchInput(recettes);
>>>>>>> boucles_natives
}
init();

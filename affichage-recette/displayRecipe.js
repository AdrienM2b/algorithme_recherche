import { recipesFactory } from './recipe-factory.js';
import { addListenerToIndex } from '../utils-filters/listeners.js';
import { searchParams } from './index.js';

function updateDisplay(resultedRecipes) {
  // il faut que j'update le resultat en fonction des paramètres
  // de l'input recherche, du tag Ingrédients, du tag Appliance, du tag Ustensiles
  displaySearch(resultedRecipes);
  addListenerToIndex(resultedRecipes);
}

function displaySearch(recipes) {
  const cardContainer = document.querySelector('#card_container');
  cardContainer.innerHTML = ''; // Effacer les recettes existantes
  if (recipes.length === 0) {
    const noRecipes = document.createElement('p');
    noRecipes.classList = 'w-auto m-auto mt-5';
    noRecipes.textContent = `Aucune recette ne contient '${searchParams.inputSearch}' vous pouvez chercher « tarte aux pommes », « poisson », etc`;
    cardContainer.appendChild(noRecipes);
  }
  recipes.forEach((recipeData) => {
    const recipe = recipesFactory(recipeData);
    cardContainer.appendChild(recipe.recipesDesign());
  });
  const totalRecettes = recipes.length;
  const containerNombreDeRecette = document.querySelector('.nbr_de_recette');
  containerNombreDeRecette.innerHTML =
    totalRecettes <= 1
      ? totalRecettes + ' recette'
      : totalRecettes + ' recettes';
}

export { displaySearch, updateDisplay };

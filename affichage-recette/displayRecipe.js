<<<<<<< HEAD
import { recherchePrincipale } from '../algorithme_de_recherche/algo_methode_native.js';
import { filtersFactory } from '../utils-filters/Filters.js';
import { recipesFactory } from './recipe-factory.js';

const cardContainer = document.querySelector('#card_container');

function removeTag() {
  const tagContainer = document.querySelector('.selected-tag_container');
  const tagButton = tagContainer.querySelector('.selected-tag_items');
  if (tagButton) {
    tagContainer.toggleAttribute('hide');
    tagContainer.removeChild(tagButton);
  }
}

function displaySearch(recipes, selectedElement) {
  const valueInput = document.querySelector('.form-control');
  // J'affiche par défaut les 50 recettes
  filtersFactory(recipes);
  showRecipes(recipes);
  valueInput.addEventListener('input', () => {
    removeTag();
    const inputValue = valueInput.value;
    // Je vérifie si la longueur de la chaîne de caractères est d'au moins 3 caractères
    if (inputValue.length >= 3) {
      // Je recupère le tri de mon algorithme
      const resultatRecherche = recherchePrincipale(recipes, inputValue);
      // J'affiche mes recettes triées et je mets à jour mes filtres
      filtersFactory(resultatRecherche, valueInput);
      showRecipes(resultatRecherche, valueInput);
    } else {
      // Si la longueur est inférieure à 3, j'efface les résultats
      cardContainer.innerHTML = '';
      // J'affiche à nouveau mes 50 recettes et je mets à jour mes filtres
      filtersFactory(recipes, valueInput);
      showRecipes(recipes, valueInput);
    }
  });
  return valueInput;
}

function showRecipes(recipes, valueInput) {
  nbrOfRecipes(recipes);
  cardContainer.innerHTML = ''; // Effacez le contenu

  if (recipes.length === 0) {
    nbrOfRecipes(recipes);
    // Aucune recette trouvée, affichez le message
    cardContainer.innerHTML = ' Aucune recette ne contient ' + valueInput.value;
  } else {
    nbrOfRecipes(recipes);
    // Des recettes ont été trouvées
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const getRecipeFact = recipesFactory(recipe);
      const showTheRecipes = getRecipeFact.recipesDesign();
      cardContainer.appendChild(showTheRecipes);
    }
  }
}

function nbrOfRecipes(recipes) {
  const containerNbrOfRecipes = document.querySelector('.nbr_de_recette');
  let i = 0;
  let nbrTotalOfRecipes = 0;
  while (i < recipes.length) {
    nbrTotalOfRecipes++;
    i++;
  }
  if (nbrTotalOfRecipes === 1) {
    containerNbrOfRecipes.textContent = nbrTotalOfRecipes + ' recette';
  } else {
    containerNbrOfRecipes.textContent = nbrTotalOfRecipes + ' recettes';
  }

  return containerNbrOfRecipes;
}

export { displaySearch, showRecipes };
=======
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
>>>>>>> boucles_natives

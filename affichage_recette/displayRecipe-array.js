import { recherchePrincipale } from '../algorithme_de_recherche/algo_methode_array.js';
import { updateFilters } from '../Utils_filtres/Filters-array.js';
import { recipesFactory } from './recipe-factory-array.js';

const cardContainer = document.querySelector('#card_container');
const formContainer = document.querySelector('.forms_container');
function removeTag() {
  const tagButton = formContainer.querySelector('.btn-close');
  if (tagButton) {
    formContainer.removeChild(tagButton);
  }
}

function displaySearch(recipes, selectedElement) {
  const valueInput = document.querySelector('.form-control');
  // J'affiche par défaut les 50 recettes
  updateFilters(recipes, selectedElement);
  showRecipes(recipes, selectedElement);
  valueInput.addEventListener('input', () => {
    removeTag();
    const inputValue = valueInput.value;
    // Je vérifie si la longueur de la chaîne de caractères est d'au moins 3 caractères
    if (inputValue.length >= 3) {
      // Je recupère le tri de mon algorithme
      const resultatRecherche = recherchePrincipale(recipes, inputValue);
      // J'affiche mes recettes triées et je mets à jour mes filtres
      updateFilters(resultatRecherche, valueInput);
      showRecipes(resultatRecherche, valueInput);
    } else {
      // Si la longueur est inférieure à 3, j'efface les résultats
      cardContainer.innerHTML = '';
      // J'affiche à nouveau mes 50 recettes et je mets à jour mes filtres
      updateFilters(recipes, valueInput);
      showRecipes(recipes, valueInput);
    }
  });

  return valueInput;
}

function showRecipes(recipes, valueInput) {
  cardContainer.innerHTML = ''; // Effacez le contenu précédent

  if (recipes.length === 0) {
    // Aucune recette trouvée, affichez le message
    cardContainer.innerHTML = ' Aucune recette ne contient ' + valueInput.value;
  } else {
    // Des recettes ont été trouvées
    recipes.forEach((recipe) => {
      const getRecipeFact = recipesFactory(recipe);
      const showTheRecipes = getRecipeFact.recipesDesign();
      cardContainer.appendChild(showTheRecipes);
    });
  }
  totalNbrOfRecipes(recipes);
}

function totalNbrOfRecipes(recipes) {
  const nbrOfrecipes = recipes.length;
  const containerNbrRecipes = document.querySelector(
    '.filters_nbr-recipes_container'
  );
  const displayNbrOfRecipes = document.createElement('p');
  containerNbrRecipes.innerHTML = '';
  displayNbrOfRecipes.textContent = nbrOfrecipes + ' recettes';
  containerNbrRecipes.appendChild(displayNbrOfRecipes);
}

export { displaySearch, showRecipes };

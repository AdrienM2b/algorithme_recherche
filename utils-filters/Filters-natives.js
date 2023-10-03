import { rechercheParTag } from '../algorithme/algo_methode_natives.js';
import {
  showRecipes,
  displaySearch,
} from '../affichage-recette/displayRecipe-natives.js';
import {
  createHtmlElement,
  addTagButton,
} from '../utils-filters/filters-factory-natives.js';

function filtersFactory(recipes, input) {
  // Créer une constante avec flatMap opur pouvoir l'utiliser dans la fonction extractELements
  // const mappedIngredient = recipes.flatMap((recipe) => recipe.ingredients);

  // On defini les différentes listes qu'on remet à zéro à la lecture de la fonction
  const dataListIngredients = document.querySelector('#list-ingredients');
  const dataListUstensiles = document.querySelector('#list-ustensils');
  const dataListAppareils = document.querySelector('#list-appliance');
  dataListIngredients.innerHTML = '';
  dataListUstensiles.innerHTML = '';
  dataListAppareils.innerHTML = '';

  // On appelle les fonctions qui vont créer les listes
  const extractElementsIngredients = extractElements(
    recipes,
    'ingredients',
    dataListIngredients
    // mappedIngredient
  );
  const extractElementsUstensils = extractElements(
    recipes,
    'ustensils',
    dataListUstensiles
  );
  const extractElementsAppliance = extractElements(
    recipes,
    'appliance',
    dataListAppareils
  );

  // On defini les différentes input des listes
  const inputIngredients = document.querySelector('#ingredients');
  const inputUstensiles = document.querySelector('#ustensils');
  const inputAppareils = document.querySelector('#appliance');

  // On appelle les ecouteurs
  addEventListenerToDropdownItems(recipes, dataListIngredients);
  addEventListenerToDropdownItems(recipes, dataListUstensiles);
  addEventListenerToDropdownItems(recipes, dataListAppareils);

  // On appelle les ecouteurs des inputs des listes
  addEventListenerInputs(
    extractElementsIngredients,
    dataListIngredients,
    inputIngredients,
    recipes
  );
  addEventListenerInputs(
    extractElementsUstensils,
    dataListUstensiles,
    inputUstensiles,
    recipes
  );
  addEventListenerInputs(
    extractElementsAppliance,
    dataListAppareils,
    inputAppareils,
    recipes
  );
}

// création des listes en fonction des données reçues
function extractElements(recipes, type, datalist) {
  let arrayOfElements = [];
  for (let i = 0; i < recipes.length; i++) {
    // on recupere chaque recette dans la variable recette
    const recette = recipes[i];
    const allElements = recette[type];

    // on lui passe type pour extraire les élements des recette
    const allIngredients = allElements;
    const allAppliance = allElements.toString().toLowerCase();
    const allUstensiles = allElements;

    switch (type) {
      case 'ingredients':
        for (let j = 0; j < allIngredients.length; j++) {
          const uniqueIngredient = allIngredients[j].ingredient
            .toString()
            .toLowerCase();
          arrayOfElements.push(uniqueIngredient);
        }
        break;
      case 'ustensils':
        for (let k = 0; k < allUstensiles.length; k++) {
          const uniqueUstensiles = allUstensiles[k].toString().toLowerCase();
          arrayOfElements.push(uniqueUstensiles);
        }
        break;
      case 'appliance':
        arrayOfElements.push(allAppliance);
        break;
    }
  }
  const uniqueList = arrayOfElements.reduce(
    (acc, currentElement) =>
      acc.includes(currentElement) ? acc : acc.concat(currentElement),
    []
  );
  return createHtmlElement(uniqueList, datalist);
}

// Creation d'un fonction pour factoriser les Listeners sur les listes
function addEventListenerToDropdownItems(recipes, dataList) {
  // const formContainer = document.querySelector('.forms_container')
  dataList.querySelectorAll('.dropdown-item').forEach((button, index) => {
    button.addEventListener('click', () => {
      const selectedIngredient = button.textContent;
      // Exécutez la recherche avec l'element sélectionné
      const resultatRecherche = rechercheParTag(recipes, selectedIngredient);
      // Mettez à jour l'affichage des recettes avec les nouvelles recettes filtrées
      showRecipes(resultatRecherche, selectedIngredient);
      filtersFactory(resultatRecherche, selectedIngredient);
      addTagButton(resultatRecherche, selectedIngredient);
    });
  });
}

// Fonction ecoute les inputs pour trier la liste des ingredients, appareils, ustensiles
function addEventListenerInputs(
  uniqueElements,
  datalist,
  inputDataList,
  recipes
) {
  inputDataList.addEventListener('input', () => {
    const valueOfinputDataList = inputDataList.value;
    if (valueOfinputDataList.length >= 3) {
      const filteredElements = uniqueElements.filter((element) => {
        return element.toLowerCase().includes(valueOfinputDataList);
      });
      datalist.innerHTML = '';
      // Mettre à jour l'affichage de la liste avec les éléments filtrés
      createHtmlElement(filteredElements, datalist);
      // Réaffecter les écouteurs
      addEventListenerToDropdownItems(recipes, datalist);
    } else if (valueOfinputDataList.length == 0) {
      createHtmlElement(uniqueElements, datalist);
    }
  });
}

export { filtersFactory };

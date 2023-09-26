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
  const mappedIngredient = recipes.flatMap((recipes) => recipes.ingredients);

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
    'ingredient',
    dataListIngredients,
    mappedIngredient
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
function extractElements(recipes, type, datalist, mappedIngredient) {
  //   const uniqueElements = [];
  if (type === 'ingredient') {
    const justIngredients = mappedIngredient.flatMap((recipe) =>
      recipe[type].toString().toLowerCase()
    );

    return console.log([...new Set(justIngredients)]);
    const ingredientListReduite = justIngredients.reduce(
      (acc, currentIngredient) =>
        acc.includes(currentIngredient) ? acc : acc.concat(currentIngredient),
      []
    );
    console.log(ingredientListReduite);
    // createHtmlElement(ingredientListReduite, datalist);
    // return ingredientListReduite;
  } else {
    const elements = recipes.map((recipe) => recipe[type].toLowerCase());
    return console.log([...new Set(elements)]);
    // const elementsListReduite = elements.reduce(
    //   (acc, currentElements) =>
    //     acc.includes(currentElements) ? acc : acc.concat(currentElements),
    //   uniqueElements
    // );
    // createHtmlElement(elementsListReduite, datalist);
    // return elementsListReduite;
  }
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
  console.log(uniqueElements);
  inputDataList.addEventListener('input', () => {
    const valueOfinputDataList = inputDataList.value;
    if (valueOfinputDataList.length >= 3) {
      const filteredElements = uniqueElements.filter((element) => {
        console.log({ element });
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

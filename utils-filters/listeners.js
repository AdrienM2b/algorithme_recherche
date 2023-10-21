import { extractElements } from './extractElements.js';
import { searchParams } from '../affichage-recette/index.js';
import { chooseWichSearch } from '../algorithme/algo_methode_natives.js';
import { updateDisplay } from '../affichage-recette/displayRecipe.js';
import { addTagButton, createHtmlElement } from './filters-factory.js';
import { recettes } from '../recipes.js';

export function addListenerToIndex(recipes) {
  const dataListIngredients = document.querySelector('#list-ingredients');
  const dataListUstensiles = document.querySelector('#list-ustensils');
  const dataListAppareils = document.querySelector('#list-appliance');

  resetDataLists([dataListIngredients, dataListUstensiles, dataListAppareils]);

  const inputIngredients = document.querySelector('#ingredients');
  const inputUstensiles = document.querySelector('#ustensils');
  const inputAppareils = document.querySelector('#appliance');

  const extractElementsIngredients = extractElements(
    recipes,
    'ingredients',
    dataListIngredients
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

  ListenToDropdownItems(recipes, dataListIngredients);
  ListenToDropdownItems(recipes, dataListUstensiles);
  ListenToDropdownItems(recipes, dataListAppareils);

  filterElementsWithInput(
    extractElementsIngredients,
    dataListIngredients,
    inputIngredients,
    recipes
  );
  filterElementsWithInput(
    extractElementsUstensils,
    dataListUstensiles,
    inputUstensiles,
    recipes
  );
  filterElementsWithInput(
    extractElementsAppliance,
    dataListAppareils,
    inputAppareils,
    recipes
  );
}

function resetDataLists(dataLists) {
  dataLists.forEach((dataList) => {
    dataList.innerHTML = '';
  });
}

// Listeners dropdown

function ListenToDropdownItems(recipes, dataList) {
  let buttonsSelected = [];
  dataList.querySelectorAll('.dropdown-item').forEach((button) => {
    button.addEventListener('click', () => {
      const container = button.closest('.filters_dropdown_container');
      manageAngleIcon(null, container);
      const clearIcon = document.querySelectorAll('.clear-icon');
      clearIcon.forEach((btnClear) => {
        btnClear.classList.remove('show');
      });
      const inputSelected = document.querySelectorAll(
        '.input_recherche_tag_list'
      );
      inputSelected.forEach((input) => {
        input.value = '';
      });
      searchParams.tags.push(button.textContent);
      buttonsSelected.push(button);
      const resultat = chooseWichSearch(recipes);
      updateDisplay(resultat);
      // Mettez à jour l'affichage des recettes avec les nouvelles recettes filtrées
      addTagButton(button.textContent);
    });
  });
}

function filterElementsWithInput(
  uniqueElements,
  datalist,
  inputDataList,
  recipes
) {
  inputDataList.addEventListener('input', () => {
    closeIcon(uniqueElements, datalist, inputDataList);
    const valueOfinputDataList = inputDataList.value;
    if (valueOfinputDataList.length >= 3) {
      const filteredElements = uniqueElements.filter((element) => {
        return element.toLowerCase().includes(valueOfinputDataList);
      });
      datalist.innerHTML = '';
      // Mettre à jour l'affichage de la liste avec les éléments filtrés
      createHtmlElement(filteredElements, datalist);
      // Réaffecter les écouteurs
      ListenToDropdownItems(recipes, datalist);
    } else if (valueOfinputDataList.length == 0) {
      const clearIcon = document.querySelectorAll('.clear-icon');
      clearIcon.forEach((btnClear) => {
        btnClear.classList.remove('show');
      });
      datalist.innerHTML = '';
      createHtmlElement(uniqueElements, datalist);
      ListenToDropdownItems(recettes, datalist);
    }
  });
}

function closeIcon(uniqueElements, datalist, inputDataList) {
  const closeIcon = inputDataList.nextElementSibling;

  if (closeIcon && closeIcon.classList.contains('clear-icon')) {
    closeIcon.classList.add('show');
    closeIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      closeIcon.classList.remove('show');
      inputDataList.value = '';
      datalist.innerHTML = '';
      createHtmlElement(uniqueElements, datalist);
      ListenToDropdownItems(recettes, datalist);
    });
  }
}

document
  .querySelectorAll('.filters_dropdown_container .btn.dropdown-toggle')
  .forEach((button) => {
    button.addEventListener('click', manageAngleIcon);
  });

function manageAngleIcon(event, element = null) {
  const dropdown = element || event.currentTarget;
  const angleIcon = dropdown.querySelector(
    '.fa-solid.fa-angle-down, .fa-solid.fa-angle-up'
  );
  if (angleIcon) {
    angleIcon.classList.toggle('fa-angle-up');
    angleIcon.classList.toggle('fa-angle-down');
  }
}

//  Listeners Input principal

export function listenSearchInput(recipes) {
  const formInput = document.querySelector('.form-control');
  formInput.addEventListener('input', (e) => {
    e.stopPropagation();
    closeIconInputSearch();
    const textFromInput = formInput.value;
    console.log(searchParams.inputSearch);
    if (textFromInput.trim() === '') {
      if (searchParams.tags) {
        searchParams.inputSearch = '';
        const resultat = chooseWichSearch(recipes);
        updateDisplay(resultat);
      } else {
        // Si l'input est vide, réinitialisez searchParams
        searchParams.inputSearch = '';
        searchParams.tags = [];
        updateDisplay(recipes); // Affichez toutes les recettes si nécessaire
      }
    }

    searchParams.inputSearch = textFromInput;
    if (textFromInput.length >= 3) {
      const resultatWithInput = chooseWichSearch(recipes);
      updateDisplay(resultatWithInput);
    }
  });
}

function closeIconInputSearch() {
  const formInput = document.querySelector('.form-control');
  const closeSearchIcon = document.querySelector('.reset-icon');
  closeSearchIcon.classList.add('show');
  closeSearchIcon.addEventListener('click', () => {
    closeSearchIcon.classList.remove('show');
    searchParams.inputSearch = '';
    formInput.value = '';
    updateDisplay(recettes);
  });
}

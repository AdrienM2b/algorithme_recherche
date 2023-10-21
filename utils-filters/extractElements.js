// import { rechercheParTag } from '../algorithme/algo_methode_natives.js';
import { searchParams } from '../affichage-recette/index.js';
import { createHtmlElement, addTagButton } from './filters-factory.js';

// création des listes en fonction des données reçues
function extractElements(recipes, type, datalist) {
  let arrayOfElements = [];
  for (let i = 0; i < recipes.length; i++) {
    // on recupere chaque recette dans la variable recette
    const recette = recipes[i];
    const allElements = recette[type];

    // on lui passe type pour extraire les élements des recette
    const allIngredients = allElements;
    const allAppliance = allElements;
    const allUstensiles = allElements;

    switch (type) {
      case 'ingredients':
        for (let j = 0; j < allIngredients.length; j++) {
          const uniqueIngredient = allIngredients[j].ingredient
            .toString()
            .toLowerCase();
          if (
            !searchParams.tags.includes(uniqueIngredient) &&
            !searchParams.inputSearch.includes(uniqueIngredient)
          )
            arrayOfElements.push(uniqueIngredient);
        }
        break;
      case 'ustensils':
        for (let k = 0; k < allUstensiles.length; k++) {
          const uniqueUstensiles = allUstensiles[k].toString().toLowerCase();
          if (
            !searchParams.tags.includes(uniqueUstensiles) &&
            !searchParams.inputSearch.includes(uniqueUstensiles)
          )
            arrayOfElements.push(uniqueUstensiles);
        }
        break;
      case 'appliance':
        if (
          !searchParams.tags.includes(allAppliance) &&
          !searchParams.inputSearch.includes(allAppliance)
        )
          arrayOfElements.push(allAppliance);
        break;
    }
  }
  const uniqueList = [...new Set(arrayOfElements)];
  createHtmlElement(uniqueList, datalist);
  return uniqueList;
}

export { extractElements };

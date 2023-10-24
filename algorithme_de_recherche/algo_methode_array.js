import { searchParams } from '../affichage-recette/index.js';

function recherchePrincipale(data, input) {
  // initialisation du nouvel ensemble (Set) qui va accueillir les données triées
  const resultatRecherche = [];

  // Tous les résultats du tri sont transformés en minuscules pour éviter les différences de casse
  const inputLowerCase = input.toLowerCase();
  data.forEach((recette) => {
    const arrayOfIngredients = recette.ingredients;
    let recipeMatch = false; // Pour savoir s'il y a eu au moins une correspondance pour cette recette

    arrayOfIngredients.forEach((listOfIngredient) => {
      const uniqueIngredient = listOfIngredient.ingredient
        .toString()
        .toLowerCase();

      if (uniqueIngredient.includes(inputLowerCase)) {
        recipeMatch = true;
      }
    });

    const lowerCaseTitre = recette.name.toString().toLowerCase();
    const lowerCaseDescription = recette.description.toString().toLowerCase();

    if (
      recipeMatch ||
      lowerCaseTitre.includes(inputLowerCase) ||
      lowerCaseDescription.includes(inputLowerCase)
    ) {
      resultatRecherche.push(recette);
    }
  });
  return resultatRecherche;
}

function rechercheParTag(data, tags) {
  const resultatRechcercheParTag = [];

  for (const recette of data) {
    const lowerCaseIngredients = recette.ingredients.map((recipe) =>
      recipe.ingredient.toString().toLowerCase()
    );
    const lowerCaseUstensiles = recette.ustensils.toString().toLowerCase();
    const lowerCaseAppliance = recette.appliance.toString().toLowerCase();

    // Vérification que chaque tag est inclus dans les ingrédients, ustensiles ou appareils
    const matchesAllTags = tags.every((tag) => {
      const tagLowerCase = tag.toLowerCase();
      return (
        lowerCaseIngredients.includes(tagLowerCase) ||
        lowerCaseUstensiles.includes(tagLowerCase) ||
        lowerCaseAppliance.includes(tagLowerCase)
      );
    });

    if (matchesAllTags) {
      resultatRechcercheParTag.push(recette);
    }
  }

  return resultatRechcercheParTag;
}

function chooseWichSearch(data) {
  if (searchParams.tags.length && searchParams.inputSearch) {
    // Si nous avons des tags et une entrée de recherche
    let resultFromInput = recherchePrincipale(data, searchParams.inputSearch);
    return rechercheParTag(resultFromInput, searchParams.tags);
  } else if (searchParams.tags.length) {
    // Si nous avons seulement des tags
    return rechercheParTag(data, searchParams.tags);
  } else if (searchParams.inputSearch) {
    // Si nous avons seulement une entrée de recherche
    return recherchePrincipale(data, searchParams.inputSearch);
  } else {
    // Si aucun critère n'est donné, retournez toutes les données
    return data;
  }
}

export { chooseWichSearch };

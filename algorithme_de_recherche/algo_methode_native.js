// La fonction prend l'argument chaine correspondant aux élements Ingredients, ustensiles et appliance
// l'argument recherche correpondant à l'input
// et la longueur de la recherche donc l'input length
import { searchParams } from '../affichage-recette/index.js';

function recherchePrincipale(data, input) {
  // initialisation du nouveau tableau qui va accueillir les données triées
  const resultatRecherche = [];
  // Tous les résultats du tri sont transformés en minuscules pour éviter les différences de casse
  const inputLowerCase = input.toLowerCase();

  for (let i = 0; i < data.length; i++) {
    const arrayOfIngredients = data[i].ingredients;

    let recipeMatch = false; // Pour savoir s'il y a eu au moins une correspondance pour cette recette

    for (let j = 0; j < arrayOfIngredients.length; j++) {
      const uniqueIngredient = arrayOfIngredients[j].ingredient
        .toString()
        .toLowerCase();

      if (uniqueIngredient.includes(inputLowerCase)) {
        recipeMatch = true;
      }
    }

    const lowerCaseTitre = data[i].name.toString().toLowerCase();
    const lowerCaseDescription = data[i].description.toString().toLowerCase();

    if (
      recipeMatch ||
      lowerCaseTitre.includes(inputLowerCase) ||
      lowerCaseDescription.includes(inputLowerCase)
    ) {
      resultatRecherche.push(data[i]);
    }
  }
  return resultatRecherche;
}

<<<<<<< HEAD:algorithme_de_recherche/algo_methode_native.js
function correspondanceElements(chaine, recherche, longueurCorrespondance) {
  // les élements sont découpés de la valeur 0 à l'input length (minimum 3)
  // puis stocké dans une valeur
  const premieresLettresChaine = chaine.substring(0, longueurCorrespondance);
  const premieresLettresRecherche = recherche.substring(
    0,
    longueurCorrespondance
  );
  // On compare les deux valeurs et on retourne un booléen
  return premieresLettresChaine === premieresLettresRecherche;
}

function rechercheParTag(data, input) {
  // initialisation du nouveau tableau qui va accueuillir les datas triées
=======
function rechercheParTag(data, tags) {
>>>>>>> boucles_natives:algorithme/algo_methode_natives.js
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

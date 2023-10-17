// La fonction prend l'argument chaine correspondant aux élements Ingredients, ustensiles et appliance
// l'argument recherche correpondant à l'input
// et la longueur de la recherche donc l'input length

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
  console.log(resultatRecherche);
  return resultatRecherche;
}

function rechercheParTag(data, input) {
  // initialisation du nouveau tableau qui va accueuillir les datas triées
  const resultatRechcercheParTag = [];

  // Tous les résultats du tri sont transformés en minuscules pour éviter les différences de casse
  const inputLowerCase = input.toLowerCase();
  for (const recette of data) {
    const lowerCaseIngredients = recette.ingredients.flatMap((recipe) =>
      recipe.ingredient.toString().toLowerCase()
    );
    const lowerCaseUstensiles = recette.ustensils.toString().toLowerCase();
    const lowerCaseAppliance = recette.appliance.toString().toLowerCase();
    // condition d'affichage des recettes en fonction du tri
    if (
      lowerCaseIngredients.includes(inputLowerCase) ||
      lowerCaseUstensiles.includes(inputLowerCase) ||
      lowerCaseAppliance.includes(inputLowerCase)
    ) {
      resultatRechcercheParTag.push(recette);
    }
  }

  return resultatRechcercheParTag;
}
export { recherchePrincipale, rechercheParTag };

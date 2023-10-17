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

function rechercheParTag(data, input) {
  // initialisation du nouveau tableau qui va accueuillir les datas triées
  const resultatRechcercheParTag = [];
  // Tous les résultats du tri sont transformés en minuscules pour éviter les différences de casse
  const inputLowerCase = input.toLowerCase();
  data.forEach((recette) => {
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
  });
  return resultatRechcercheParTag;
}
export { recherchePrincipale, rechercheParTag };

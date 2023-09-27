function recherchePrincipale(data, input) {
  // initialisation du nouveau tableau qui va accueuillir les datas triées
  const resultatRechcerche = [];
  //   Mettre l'input en minuscule et calculer sa longueur
  const inputLowerCase = input.toLowerCase();
  const longueurCorrespondance = input.length;
  // parcourir toutes les recettes
  for (let i = 0; i < data.length; i++) {
    // on recupere chaque recette dans la variable recette
    const recette = data[i];
    // On decoupe les recettes par élements 'ingredients', 'ustensiles'..
    const allIngredients = recette.ingredients;
    const allUstensiles = recette.ustensils;
    const allAppliance = recette.appliance;
    // Une boucle pour traverser tous les ingrédients
    for (let j = 0; j < allIngredients.length; j++) {
      // une constante qui récupere 1 par 1 les ingrédients contentu dans le tableau allIngredients
      //   et les transforme en string et minuscule
      const uniqueIngredients = allIngredients[j].ingredient
        .toString()
        .toLowerCase();
      // On regarde si la fonction renvoie True et on envoie les données au tableau
      if (
        correspondanceElements(
          uniqueIngredients,
          inputLowerCase,
          longueurCorrespondance
        )
      ) {
        resultatRechcerche.push(recette);
        break;
      }
    }
    for (let k = 0; k < allUstensiles.length; k++) {
      // une constante qui récupere 1 par 1 les ustensiles contentu dans le tableau allUstensiles
      // et les transforme en string et minuscule
      const uniqueUstensiles = allUstensiles[k];
      // On regarde si la fonction renvoie True et on envoie les données au tableau
      if (
        correspondanceElements(
          uniqueUstensiles,
          inputLowerCase,
          longueurCorrespondance
        )
      ) {
        resultatRechcerche.push(recette);
        break;
      }
    }
    const applianceLowerCase = allAppliance.toString().toLowerCase();
    if (correspondanceElements(applianceLowerCase, inputLowerCase)) {
      resultatRechcerche.push(recette);
    }
  }
  return resultatRechcerche;
}

// La fonction prend l'argument chaine correspondant aux élements Ingredients, ustensiles et appliance
// l'argument recherche correpondant à l'input
// et la longueur de la recherche donc l'input length
function correspondanceElements(chaine, recherche, longueurCorrespondance) {
  // les élements sont découpés de la valeur 0 à l'input length (minimum 3)
  // puis stocké dans une valeur
  const premieresLettresChaine = chaine.substring(0, longueurCorrespondance);
  const premieresLettresRecherche = recherche.substring(
    0,
    longueurCorrespondance
  );
  // On compare les deux valeurs et on retourne un
  return premieresLettresChaine === premieresLettresRecherche;
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

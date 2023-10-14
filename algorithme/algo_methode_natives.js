// La fonction prend l'argument chaine correspondant aux élements Ingredients, ustensiles et appliance
// l'argument recherche correpondant à l'input
// et la longueur de la recherche donc l'input length

function recherchePrincipale(data, input) {
  // initialisation du nouveau tableau qui va accueillir les données triées
  const resultatRecherche = [];
  // Mettre l'input en minuscule et calculer sa longueur
  const inputLowerCase = input.toLowerCase();
  const longueurCorrespondance = input.length;

  // parcourir toutes les recettes
  for (let i = 0; i < data.length; i++) {
    // on récupère chaque recette dans la variable recette
    const recette = data[i];
    // On découpe les recettes par éléments 'ingredients', 'ustensiles'..
    const allIngredients = recette.ingredients;
    const titleRecipes = recette.name;
    const descriptionRecipes = recette.description.split(' ');

    // Variable pour suivre si une correspondance a été trouvée dans cette recette
    let correspondanceTrouvee = false;

    // Une boucle pour traverser tous les ingrédients
    for (let j = 0; j < allIngredients.length; j++) {
      // une constante qui récupère 1 par 1 les ingrédients contenu dans le tableau allIngredients
      // et les transforme en string et minuscule
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
        correspondanceTrouvee = true;
        break; // Sortir de la boucle interne si une correspondance est trouvée
      }
    }

    if (!correspondanceTrouvee) {
      for (let k = 0; k < descriptionRecipes.length; k++) {
        // une constante qui récupère 1 par 1 les mots contenu dans le texte de la description
        // et les transforme en minuscule
        const uniqueDescriptionRecipe = descriptionRecipes[k].toLowerCase();
        // On regarde si la fonction renvoie True et on envoie les données au tableau
        if (
          correspondanceElements(
            uniqueDescriptionRecipe,
            inputLowerCase,
            longueurCorrespondance
          )
        ) {
          correspondanceTrouvee = true;
          break; // Sortir de la boucle interne si une correspondance est trouvée dans la description
        }
      }
    }

    if (!correspondanceTrouvee) {
      const titleRecipesLowerCase = titleRecipes.toString().toLowerCase();
      if (correspondanceElements(titleRecipesLowerCase, inputLowerCase)) {
        correspondanceTrouvee = true;
      }
    }

    if (correspondanceTrouvee) {
      resultatRecherche.push(recette);
      // Une correspondance a été trouvée dans cette recette, mais nous ne sortons pas de la boucle principale
    }
  }

  return resultatRecherche;
}

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

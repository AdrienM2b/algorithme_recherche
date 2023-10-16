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
    if (
      lowerCaseIngredients.includes(inputLowerCase) ||
      lowerCaseTitre.includes(inputLowerCase) ||
      lowerCaseDescription.includes(inputLowerCase)
    ) {
      resultatRechcerche.push(recette);
    }

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

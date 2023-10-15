function recipesFactory(data) {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  function recipesDesign() {
    // card de la recette
    const recipeContainer = document.createElement('article');
    recipeContainer.classList = 'card-sm rounded-4 recipe-container';

    // L'image
    const mediaRecipe = document.createElement('img');
    mediaRecipe.classList =
      'card-img-top rounded-4 rounded-bottom-0 recipe-media';

    let URLImage = '';
    const baseURLImage = '/Photos_P7_les_petits_plats';
    id < 10
      ? (URLImage = baseURLImage + `/Recette0` + id + `.jpg`)
      : (URLImage = baseURLImage + `/Recette` + id + `.jpg`);
    mediaRecipe.setAttribute('src', URLImage);

    const timeForRecipes = document.createElement('span');
    timeForRecipes.textContent = time + ' min';
    timeForRecipes.classList = 'badge position-relative float-end';

    // contenu sous la photo wrapper dans une div pour ajouter le style
    const containerContentCard = document.createElement('div');
    containerContentCard.classList = 'card-body p-3 rounded-4 rounded-top-0';
    // contenu de la recette
    const recipeContent = document.createElement('div');
    recipeContent.classList = 'recipe-content mb-3';

    // titre de la recette
    const recipeTitle = document.createElement('h2');
    recipeTitle.classList = 'card-title recipe-content_title mb-4 mt-4';
    recipeTitle.textContent = name;

    // conteneur de la descritption
    const recipeDescription = document.createElement('div');
    recipeDescription.classList = 'recipe-content-descritpion mt-3';

    // titre de la recette
    const recipeTextTitle = document.createElement('h3');
    recipeTextTitle.textContent = 'Recette';
    recipeTextTitle.style.font = 'uppercase';

    // couper le texte
    function truncate(str, maxlength) {
      return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str;
    }

    // descritpion de la recette
    const recipeText = document.createElement('p');
    recipeText.classList = 'card-text recipe-content_text';
    recipeText.textContent = truncate(description, 181);

    // conteneur du titre et des ingredients
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList = 'recipe-content-ingredients mt-3';

    // titre Ingredients
    const recipeIngredientsTitle = document.createElement('h3');
    recipeIngredientsTitle.textContent = 'Ingrédients';
    recipeIngredientsTitle.style.font = 'uppercase';

    // conteneur des ingredients
    const ingredientsListContainer = document.createElement('div');
    ingredientsListContainer.classList =
      'card-text recipe-content_container-ingredients';

    ingredients.forEach((listIngredients) => {
      let list = listIngredients.ingredient;
      let quantity = listIngredients.quantity ? listIngredients.quantity : '';
      let unit = listIngredients.unit ? listIngredients.unit : '';
      let nameIngredients = document.createElement('p');
      nameIngredients.classList.add('name-ingredients');
      nameIngredients.textContent = list;

      let quantityIngredients = document.createElement('p');
      quantityIngredients.classList.add('quantity-ingredients');
      quantityIngredients.textContent = quantity + unit;

      nameIngredients.appendChild(quantityIngredients);
      ingredientsListContainer.appendChild(nameIngredients);
    });

    recipeDescription.appendChild(recipeTextTitle);
    recipeDescription.appendChild(recipeText);
    containerContentCard.appendChild(recipeTitle);
    containerContentCard.appendChild(recipeDescription);

    recipeIngredients.appendChild(recipeIngredientsTitle);
    recipeIngredients.appendChild(ingredientsListContainer);
    containerContentCard.appendChild(recipeIngredients);

    recipeContainer.appendChild(timeForRecipes);
    recipeContainer.appendChild(mediaRecipe);
    recipeContainer.appendChild(containerContentCard);

    return recipeContainer;
  }

  return { id, servings, appliance, ustensils, ingredients, recipesDesign };
}

export { recipesFactory };

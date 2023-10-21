import { updateDisplay } from '../affichage-recette/displayRecipe.js';
import { searchParams } from '../affichage-recette/index.js';
import { chooseWichSearch } from '../algorithme/algo_methode_natives.js';
import { recettes } from '../recipes.js';
// Creation du html des boutons
function createHtmlElement(uniqueElements, dataList) {
  let i = 0;
  while (i < uniqueElements.length) {
    const element = uniqueElements[i];
    const list = document.createElement('li');
    const buttons = document.createElement('button');
    buttons.classList.add('dropdown-item');
    list.value = [i];
    buttons.textContent = element;
    list.appendChild(buttons);
    dataList.appendChild(list);
    i++;
  }
}

// Fonction pour ajouter le bouton au formulaire
function addTagButton(tagName) {
  const TagContainer = document.querySelector('.selected-tag_container');
  const tagItems = document.createElement('span');
  const tagText = document.createElement('p');
  tagItems.classList =
    'selected-tag_items d-flex justify-content-between align-items-center';
  const buttonTag = document.createElement('span');
  buttonTag.classList = 'btn-close tag';
  tagText.textContent = tagName;

  // Ajoutez le nouveau bouton
  tagItems.appendChild(tagText);
  tagItems.appendChild(buttonTag);
  TagContainer.appendChild(tagItems);

  buttonTag.addEventListener('click', function () {
    tagItems.remove();
    // 2. Supprimez le tag de searchParams.tags
    const index = searchParams.tags.indexOf(tagName);
    if (index !== -1) {
      searchParams.tags.splice(index, 1);
    }
    const resultat = chooseWichSearch(recettes);
    updateDisplay(resultat);
  });
}

export { createHtmlElement, addTagButton };

// Creation du html des boutons
function createHtmlElement(uniqueElements, dataList, inputList) {
  uniqueElements.forEach((element, i) => {
    const list = document.createElement('li');
    const buttons = document.createElement('button');
    buttons.classList.add('dropdown-item');
    list.value = [i];
    buttons.textContent = element;
    list.appendChild(buttons);
    dataList.appendChild(list);
  });
}

// Fonction pour ajouter le bouton au formulaire
function addTagButton(recipes, tagName) {
  const formContainer = document.querySelector('.selected-tag');
  const tagSelected = document.createElement('span');
  tagSelected.classList = 'tag_selected show';
  tagSelected.textContent = tagName;

  const buttonClose = document.createElement('button');
  buttonClose.classList = 'btn-close';
  // Ajoutez le nouveau bouton
  formContainer.appendChild(tagSelected);
  tagSelected.appendChild(buttonClose);
}

export { createHtmlElement, addTagButton };

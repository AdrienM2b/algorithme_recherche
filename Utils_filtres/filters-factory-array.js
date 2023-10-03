// Creation du html des boutons
function createHtmlElement(uniqueElements, dataList, inputList) {
  // const rechercheTag = document.createElement('input')
  // rechercheTag.classList = 'input_recherche_tag_' + dataList.id
  // rechercheTag.id = dataList.id.slice(5, 16)
  // dataList.appendChild(rechercheTag)
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
  const TagContainer = document.querySelector('.selected-tag_container');
  const tagItems = document.createElement('span');
  const tagText = document.createElement('p');
  tagItems.classList =
    'selected-tag_items d-flex justify-content-between align-items-center';
  const buttonTag = document.createElement('button');
  buttonTag.classList = 'btn-close';
  tagText.textContent = tagName;
  // Ajoutez le nouveau bouton
  tagItems.appendChild(tagText);
  tagItems.appendChild(buttonTag);
  TagContainer.appendChild(tagItems);
  // Mettez à jour la référence au bouton actuel
  selectedButton = buttonTag;
}

export { createHtmlElement, addTagButton };

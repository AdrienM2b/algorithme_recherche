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
  const formContainer = document.querySelector('.forms_container');
  const buttonTag = document.createElement('button');
  buttonTag.classList = 'btn-close show';
  buttonTag.type = 'button';
  buttonTag.textContent = tagName;
  // Ajoutez le nouveau bouton
  formContainer.appendChild(buttonTag);
}

export { createHtmlElement, addTagButton };

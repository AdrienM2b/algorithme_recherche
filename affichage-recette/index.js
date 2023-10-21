import { displaySearch } from './displayRecipe.js';
import {
  addListenerToIndex,
  listenSearchInput,
} from '../utils-filters/listeners.js';
import { recettes } from '../recipes.js';

export const searchParams = {
  inputSearch: '',
  tags: [],
};

async function init() {
  displaySearch(recettes);
  addListenerToIndex(recettes);
  listenSearchInput(recettes);
}
init();

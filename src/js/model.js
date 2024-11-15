import { API_URL, KEY, RES_PER_PAGE } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id == id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      ingredient.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark to bookmarks array
  state.bookmarks.push(recipe);

  // update localStorage
  persistBookmarks();

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // Find index
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  // Delete from bookmarks array
  state.bookmarks.splice(index, 1);

  // update localStorage
  persistBookmarks();

  // Mark current recipe as bookmarked = false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  let ingredients = newRecipe
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ingredient => {
      const ingArr = ingredient[1].split(',').map(el => el.trim());
      if (ingArr.length !== 3) throw new Error('Wrong ingredient format.');
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  let newRecipeObj = Object.fromEntries(newRecipe);
  const recipe = {
    cooking_time: +newRecipeObj.cookingTime,
    image_url: newRecipeObj.image,
    ingredients,
    publisher: newRecipeObj.publisher,
    servings: +newRecipeObj.servings,
    source_url: newRecipeObj.sourceUrl,
    title: newRecipeObj.title,
  };
  const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
  state.recipe = createRecipeObject(data);
  addBookmark(state.recipe);
};

(function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
})();

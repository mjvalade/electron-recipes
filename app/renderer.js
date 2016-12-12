const { ipcRenderer, remote } = require('electron');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const $name = $('.name-input');
const $servings = $('.servings-input');
const $time = $('.time-input');
const $ingredients = $('.ingredients-input');
const $directions = $('.directions-input');
const $notes = $('.notes-input');
const $saveButton = $('.save-recipe-button');
const $seeAllButton = $('.see-all-button');
const $homeButton = $('.home-button');
const $addRecipeButton = $('.add-button');

let pageNav = (page) => {
 currentWindow.loadURL(`file://${__dirname}/${page}`);
};

$saveButton.on('click', () => {
  let name = $name.val();
  let servings = $servings.val();
  let time = $time.val();
  let ingredients = $ingredients.val();
  let directions = $directions.val();
  let notes = $notes.val();
  let recipe = { name, servings, time, ingredients, directions, notes};
  mainProcess.saveRecipe(recipe);
  pageNav('full-recipe.html');
});

$seeAllButton.on('click', () => {
  mainProcess.getRecipes();
  pageNav('all-recipes.html');
});

$homeButton.on('click', () => {
  pageNav('index.html');
});

$addRecipeButton.on('click', () => {
  pageNav('add-recipe.html');
});

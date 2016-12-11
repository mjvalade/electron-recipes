const { ipcRenderer, remote } = require('electron');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const $name = $('.name-input');
const $servings = $('.servings-input');
const $time = $('.time-input');
const $ingredients = $('.ingredients-input');
const $directions = $('.directions-input');
const $notes = $('.notes-input');
const $addButton = $('.add-recipe-button');
const $allButton = $('#all-button');

$addButton.on('click', () => {
  let name = $name.val();
  let servings = $servings.val();
  let time = $time.val();
  let ingredients = $ingredients.val();
  let directions = $directions.val();
  let notes = $notes.val();
  let recipe = { name, servings, time, ingredients, directions, notes};
  mainProcess.saveRecipe(recipe);
  currentWindow.loadURL(`file://${__dirname}/all-recipes.html`);
});

$allButton.on('click', () => {
  mainProcess.getRecipes();
});

const { ipcRenderer, remote } = require('electron');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const $name = $('.name-input');
// const $photo = $('.photo-upload');
const $servings = $('.servings-input');
const $time = $('.time-input');
const $ingredients = $('.ingredients-input');
const $directions = $('.directions-input');
const $notes = $('.notes-input');
const $addButton = $('.add-recipe-button');
const $allButton = $('#all-button');

// mainProcess.getRecipes();

$addButton.on('click', () => {
  let name = $name.val();
  // let photo = $photo.val();
  let servings = $servings.val();
  let time = $time.val();
  let ingredients = $ingredients.val();
  let directions = $directions.val();
  let notes = $notes.val();
  mainProcess.saveRecipe({ name, servings, time, ingredients, directions, notes});
  currentWindow.loadURL(`file://${__dirname}/all-recipes.html`);

});

$allButton.on('click', () => {
  mainProcess.getRecipes();
});

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
const $searchButton = $('.search-button');
const $searchInput = $('.search-input');
const $recipeContainer = $('.recipe-list-container');
const $recipeCard = $('.recipe-card');

let recipes = [];
let recipe = {};

mainProcess.getRecipes();

ipcRenderer.on('retrieved-recipes', (event, data) => {
  console.log('ipc data', data);
  renderRecipeCard(data);
});

const renderRecipeCard = (data) => {
  $recipeContainer.empty();
  data.recipes.forEach((recipe) => {
    $recipeContainer.append(`
      <div class="recipe-card" id=${recipe.name}>
        <a href="#">
          <img src="" alt="food image" />
          <section class="card-content">
            <h1 class="recipe-title">${recipe.name}</h1>
          </section>
        </a>
      </div>
    `);
  });
};

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
  pageNav('all-recipes.html');
  renderRecipeCard(recipes);
});

$homeButton.on('click', () => {
  pageNav('index.html');
});

$addRecipeButton.on('click', () => {
  pageNav('add-recipe.html');
});

$searchInput.on('keyup', () => {
  if ($searchInput.val()) {
    $searchButton.prop('disabled', false);
  } else {
    $searchButton.prop('disabled', true);
  }
});

$recipeCard.on('click', () => {
  pageNav('full-recipe.html');
});

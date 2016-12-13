const { ipcRenderer, remote } = require('electron');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const $addRecipeButton = $('.add-button');
const $directions = $('#directions');
const $fullContainer = $('.full-recipe-container');
const $homeButton = $('.home-button');
const $ingredients = $('#ingredients');
const $name = $('#name');
const $newDirection = $('.new-direction-button');
const $newIngredient = $('.new-ingredient-button');
const $notes = $('#notes');
const $recipeContainer = $('.recipe-list-container');
const $saveButton = $('.save-recipe-button');
const $seeAllButton = $('.see-all-button');
const $servings = $('#servings');
const $time = $('#cook-time');

const array = [];

let inputCounter = 1;
let directionsCounter = 1;

mainProcess.getRecipes();

ipcRenderer.on('retrieved-recipes', (event, data) => {
  data.recipes.forEach((r) => array.push(r));
  console.log('ipc data', array);
  renderRecipeCard(array);
  renderFullRecipe(array);
});

const showHide = () => {
  $recipeContainer.toggleClass('hidden');
  $fullContainer.toggleClass('hidden');
  $seeAllButton.toggleClass('hidden');
};

const renderRecipeCard = (recipes) => {
  $recipeContainer.empty();
  recipes.forEach((recipe) => {
    $recipeContainer.append(`
      <section class="recipe-card" id=${recipe.id}>
        <img src="" alt="food image" />
        <article class="card-content">
          <h1 class="recipe-title">${recipe.name}</h1>
        </article>
      </section>
    `);
  });
  $('.recipe-card').on('click', (e) => {
    showHide();
    renderFullRecipe(parseInt(e.currentTarget.id));
  });
};

const renderFullRecipe = (id) => {
  $fullContainer.empty();
  array.forEach(recipe => {
    if(recipe.id === id) {
      $fullContainer.append(`
        <div class="full-recipe" id=${recipe.id}>
          <p class="display-name">
            <span class="labels">${recipe.name}</span>
          </p>
          <img src="" alt="food image" class="display-photo" />
          <p class="display-text">
              <span class="labels">Number of Servings: </span>${recipe.servings}
          </p>
          <p class="display-text">
              <span class="labels">Cook Time: </span>${recipe.time}
          </p>
          <p class="display-text">
              <span class="labels">Ingredients: </span>${recipe.ingredients}
          </p>
          <p class="display-text">
              <span class="labels">Directions: </span>${recipe.directions}
          </p>
          <p class="display-text">
              <span class="labels">Notes: </span>${recipe.notes}
          </p>
        </div>
      `);
    }
  });
};

let pageNav = (page) => {
  currentWindow.loadURL(`file://${__dirname}/${page}`);
};

let addInput = () => {
  let newListItem = `
    <label class="ingredients-label input-label" for="ingredients">
      Ingredient ${inputCounter + 1}:
    </label>
    <input id="ingredients" name="ingredientsList[]" type="text" class="input" /><br>`;
  $('.dynamicInput').append(newListItem);
  inputCounter++;
};

let addDirection = () => {
  let newDirectionItem =`
  <input id="directions" name="directionsList[]" type="text" class="input" /><br>`;
  $('.dynamicDirections').append(newDirectionItem);
  directionsCounter++;
};

$newIngredient.on('click', (e) => {
  e.preventDefault();
  addInput();
});

$newDirection.on('click', (e) => {
  e.preventDefault();
  addDirection();
});

$saveButton.on('click', () => {
  let id = Date.now();
  let name = $name.val();
  let servings = $servings.val();
  let time = $time.val();
  let ingredients = $ingredients.val();
  let directions = $directions.val();
  let notes = $notes.val();
  let recipe = { id, name, servings, time, ingredients, directions, notes};
  mainProcess.saveRecipe(recipe);
  pageNav('all-recipes.html');
});

$seeAllButton.on('click', () => {
  pageNav('all-recipes.html');
  renderRecipeCard();
});

$homeButton.on('click', () => {
  pageNav('index.html');
});

$addRecipeButton.on('click', () => {
  pageNav('add-recipe.html');
});

$ingredients.on('keyup', () => {
  if ($ingredients.val()) {
    $newIngredient.prop('disabled', false);
  } else {
    $newIngredient.prop('disabled', true);
  }
});

$ingredients.on('keyup', () => {
  if ($ingredients.val()) {
    $newIngredient.prop('disabled', false);
  } else {
    $newIngredient.prop('disabled', true);
  }
});

const { ipcRenderer, remote } = require('electron');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const $addRecipeButton = $('.add-button');
const $directions = $('#directions');
const $fullContainer = $('.full-recipe-container');
const $homeButton = $('.home-button');
const $ingredients = $('#ingredients');
const $name = $('#name');
const $newIngredient = $('.new-ingredient-button');
const $notes = $('#notes');
const $recipeCard = $('.recipe-card');
const $recipeContainer = $('.recipe-list-container');
const $saveButton = $('.save-recipe-button');
const $searchButton = $('.search-button');
const $searchInput = $('.search-input');
const $deleteButton = $('.delete-button');
const $seeAllButton = $('.see-all-button');
const $servings = $('#servings');
const $time = $('#time');
const $newDirections = $('.new-direction-button');
const array = [];

let inputCounter = 1;

mainProcess.getRecipes();
// mainProcess.getOneRecipe();

ipcRenderer.on('retrieved-recipes', (event, data) => {
  data.recipes.forEach((r) => array.push(r));
  console.log('ipc data', array);
  renderRecipeCard(array);
});

// ipcRenderer.on('retrieved-onerecipe', (event, data) => {
//   // console.log('ipc one recipe', data.recipes);
//   renderFullRecipe(data);
// });

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
    pageNav('full-recipe.html');
    renderFullRecipe(parseInt(e.currentTarget.id));
  });
};

const renderFullRecipe = (id) => {
  $fullContainer.empty();
  array.forEach(recipe => {
    if(recipe.id === id) {
      debugger
      $fullContainer.append(`
        <div class="full-recipe" id=${recipe.id}>
          <p class="display-name">
            Recipe Name: ${recipe.name}
          </p>
          <img src="" alt="food image" />
          <p class="display-servings">
            <h3>
              Number of Servings: ${recipe.servings}
            </h3>
          </p>
          <p class="display-time">
            <h3>
              Cook Time: ${recipe.time}
            </h3>
          </p>
          <p class="display-ingredients">
            <h3>
              Ingredients: ${recipe.ingredients}
            </h3>
          </p>
          <p class="display-directions">
            <h3>
              Directions: ${recipe.directions}
            </h3>
          </p>
          <p class="display-notes">
            <h3>
              Notes: ${recipe.notes}
            </h3>
          </p>
          <button class="footer-button delete-button">
            Delete
          </button>
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
    <input id="ingredients" name="ingredientsList[]" type="text" class="input" />`;

  $('.dynamicIngredient').append(newListItem);
  inputCounter++;
};

$newIngredient.on('click', (e) => {
  e.preventDefault();
  addInput();
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
  pageNav('full-recipe.html');
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

$searchInput.on('keyup', () => {
  if ($searchInput.val()) {
    $searchButton.prop('disabled', false);
  } else {
    $searchButton.prop('disabled', true);
  }
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

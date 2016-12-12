const { ipcRenderer, remote } = require('electron');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const $addRecipeButton = $('.add-button');
const $directions = $('#directions');
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
const $seeAllButton = $('.see-all-button');
const $servings = $('#servings');
const $time = $('#time');


let inputCounter = 1;
let limit = 10;

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


// let addInput = (item) => {

  // var newDiv = document.createElement('div');
  // newDiv.innerHTML = "Ingredient " + (counter + 1) + "<input type='text' name='myIngredients[]'>";
  // document.getElementById(divName).appendChild(newdiv);
  // counter++;

  // $('body').append('<p>This is the text in new element.<p>');
  // let newListItem = `<label class="ingredients-label input-label" for="ingredients">
  //     Ingredient + ${counter + 1} +:
  //   </label>
  //   <input id="ingredients" name="ingredientsList[]" type="text" class="input" />`
  // $('.dynamicInput').append();
  // newItem.val()
// };

$newIngredient.on('click', () => {

});

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

$recipeCard.on('click', () => {
  pageNav('full-recipe.html');
});

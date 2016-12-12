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
const $fullContainer = $('.full-recipe-container');

mainProcess.getRecipes();
// mainProcess.getOneRecipe();

ipcRenderer.on('retrieved-recipes', (event, data) => {
  console.log('ipc data', data.recipes);
  renderRecipeCard(data);
});

ipcRenderer.on('retrieved-onerecipe', (event, data) => {
  console.log('ipc one recipe', data.recipes);
  // renderFullRecipe(data);
});

const renderRecipeCard = (data) => {
  $recipeContainer.empty();
  data.recipes.forEach((recipe) => {
    $recipeContainer.append(`
      <section class="recipe-card" id=${recipe.id}>
        <img src="" alt="food image" />
        <article class="card-content">
          <h1 class="recipe-title">${recipe.name}</h1>
        </article>
      </section>
    `);
  });
};

// const renderFullRecipe = (data) => {
//   $fullContainer.empty();
//   data.recipes.filter((id) => {
//     $fullContainer.append(`
//       <div class="full-recipe" id=${recipe.id}>
//         <p class="display-name">
//           Recipe Name: ${recipe.name}
//         </p>
//         <p class="display-photo">
//           Image of Food
//         </p>
//         <p class="display-servings">
//           <h3>
//             Number of Servings: ${recipe.servings}
//           </h3>
//         </p>
//         <p class="display-time">
//           <h3>
//             Cook Time: ${recipe.time}
//           </h3>
//         </p>
//         <p class="display-ingredients">
//           <h3>
//             Ingredients: ${recipe.ingredients}
//           </h3>
//         </p>
//         <p class="display-directions">
//           <h3>
//             Directions: ${recipe.directions}
//           </h3>
//         </p>
//         <p class="display-notes">
//           <h3>
//             Notes: ${recipe.notes}
//           </h3>
//         </p>
//       </div>
//     `);
//   });
// };

let pageNav = (page) => {
 currentWindow.loadURL(`file://${__dirname}/${page}`);
};

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

$recipeCard.on('click', () => {
  // mainProcess.getOneRecipe(id);
  pageNav('full-recipe.html');
  // renderFullRecipe(id);
});

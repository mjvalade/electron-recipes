const {
  app,
  BrowserWindow
} = require('electron');

const storage = require('electron-storage');

let win = null;

app.on('ready', () => {
  recipeStorageExists();
  createWindow();
});

const createWindow = () => {
  win = new BrowserWindow({ show: false });
  win.loadURL(`file://${__dirname}/index.html`);
  win.once('ready-to-show', () => win.show());
  win.on('closed',() => {
    win = null;
  });
  return win;
};

let data = { recipes: [] };

const recipeStorageExists = () => {
  storage.isPathExists('saved-recipes.json')
    .then(itDoes => {
      if (!itDoes) {
        storage.set('saved-recipes', data)
        .then(() => {
          console.log('Recipe storage exists');
        })
        .catch(err => {
          console.error(err);
        });
      }
    });
};

const getRecipes = exports.getRecipes = () => {
  storage.get('saved-recipes')
  .then(data => {
    win.webContents.send('retrieved-recipes', data);
    // console.log('get data', data);
  })
  .catch(err => {
    console.error(err);
  });
};

const getOneRecipe = exports.getOneRecipe = (id) => {
  storage.get('saved-recipes')
  .then(data => {
    win.webContents.send('retrieved-onerecipe', data);
  })
  .catch(err => {
    console.error(err);
  });
};
// const getOneRecipe
// pass in id to storage.get
// .send that id

// can add counter to saveRecipe and increment 1 each time to have an id available
let counter = 0;
const saveRecipe = exports.saveRecipe = (recipe) => {
  storage.get('saved-recipes')
  .then((data) => {
    // recipe.id = counter
    // if counter > id
    counter++;
    data.recipes.unshift(recipe);
    let updatedRecipes = { recipes: data.recipes };
    storage.set('saved-recipes', updatedRecipes)
      .then(() => {console.log('Updated recipe list', updatedRecipes);
      })
      .catch((err) => console.log(err));
  })
  .catch(err => console.log(err));
};

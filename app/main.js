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
  })
  .catch(err => {
    console.error(err);
  });
};

const getOneRecipe = exports.getOneRecipe = (id) => {
  storage.get('saved-recipes')
  .then(data => {
    console.log('one recipe?', data);
    win.webContents.send('retrieved-onerecipe', data);
  })
  .catch(err => {
    console.error(err);
  });
};

const saveRecipe = exports.saveRecipe = (recipe) => {
  storage.get('saved-recipes')
  .then((data) => {
    data.recipes.unshift(recipe);
    let updatedRecipes = { recipes: data.recipes };
    storage.set('saved-recipes', updatedRecipes)
      .then(() => {console.log('Updated recipe list', updatedRecipes);
      })
      .catch((err) => console.log(err));
  })
  .catch(err => console.log(err));
};

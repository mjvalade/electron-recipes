const {
  app,
  BrowserWindow
} = require('electron');

const storage = require('electron-storage');

app.on('ready', () => {
  recipeStorageExists();
  createWindow();
});

const createWindow = () => {
  let win = new BrowserWindow({ show: false });
  win.loadURL(`file://${__dirname}/index.html`);
  win.once('ready-to-show', () => win.show());
  win.on('closed',() => {
    win = null;
  });
  return win;
};

const data = { saved: [] };

const recipeStorageExists = () => {
  storage.isPathExists('savedRecipes.json')
    .then(itDoes => {
      if (!itDoes) {
        storage.set('savedRecipes', data)
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
  storage.get('savedRecipes')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
};

const saveRecipe = exports.saveRecipe = (recipe) => {
  storage.get('savedRecipes')
    .then((data) => {
      data.saved.unshift(recipe);
      let updatedRecipes = { current: data.current, saved: data.saved };
      storage.set('savedRecipes', updatedRecipes)
        .then(() => {
          console.log('Updated recipe list', updatedRecipes);
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
};

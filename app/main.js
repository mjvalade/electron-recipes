const {
  app,
  BrowserWindow
} = require('electron');

const windows = new Set();

app.on('ready', () => {
  createWindow();
});

const createWindow = () => {
  let win = new BrowserWindow({ show: false });
  windows.add(win);
  win.loadURL(`file://${__dirname}/index.html`);
  win.once('ready-to-show', () => win.show());
  win.on('closed',() => {
    windows.delete(win);
    win = null;
  });
  return win;
};

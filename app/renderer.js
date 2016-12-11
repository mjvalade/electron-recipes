const { ipcRenderer, remote } = require('electron');
const mainProcess = remote.require('./main');
// const currentWindow = remote.getCurrentWindow();

mainProcess.getRecipes();

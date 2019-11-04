const electron = require("electron");
// Variable Mostar o Ocultar frames
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require("path");
const isDev = require("electron-is-dev");

require("electron-reload")(__dirname);

let mainWindow;
let cameraWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js"
    }
  });

  cameraWindow = new BrowserWindow({
    width: 800,
    height: 580,
    parent: mainWindow,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js"
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  cameraWindow.loadURL(
    isDev
      ? "http://localhost:3000/screen"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
  cameraWindow.on("close", (e) => {
    e.preventDefault();
    cameraWindow.hide();
  });

  mainWindow.setIcon(path.join(__dirname, "../src/assets/icon.png"));

  Menu.setApplicationMenu(null);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Evento para mostrar y ocultar frame
ipcMain.on("toogle-camera", (event, arg) => {
  cameraWindow.show();
});

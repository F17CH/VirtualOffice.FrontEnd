import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as isDev from "electron-is-dev";

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  mainWindow.removeMenu();

  if (isDev) {
    mainWindow.loadURL(`http://localhost:4000`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.on('windowstate-modification-request', (e, msg) => {
  switch (msg) {
    case 'minimize': {
      mainWindow?.minimize();
      break;
    }
    case 'maximize': {
      if (mainWindow?.isMaximized()) {
        mainWindow?.unmaximize();
      } else {
        mainWindow?.maximize();
      }
      break;
      }
      case 'close': {
        mainWindow?.close();
        break;
      }
      default: {
        throw new Error('Unsupported window state change requested');
      }
    }
});

app.on("ready", createWindow);
app.allowRendererProcessReuse = true;

import { BrowserWindow, Menu, Tray, app } from "electron";
import path from "path";
import { getDirname } from "../utils";
import { isProd } from "../utils";

const dirname = getDirname(import.meta.url);
const preloadIndex = path.join(dirname, "../preload/index.js");
const env = process.env;
const electronBuild = path.join(dirname, "../../dist/index.html");
const iconPath = isProd
  ? path.join(process.resourcesPath, "assets/crow.png")
  : path.join(dirname, "../assets/crow.png");

let mainWindow: BrowserWindow;
let tray: Tray;

export const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    center: true,
    icon: iconPath,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: preloadIndex,
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  if (env.NODE_ENV === "development" && env.DEV_SERVER_URL) {
    mainWindow.loadURL(env.DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(electronBuild);
  }

  Menu.setApplicationMenu(null);

  mainWindow.webContents.openDevTools();
};

export const addTray = () => {
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: "quit", click: () => app.quit() },
  ]);
  tray.setToolTip("test");
  tray.setContextMenu(contextMenu);
};

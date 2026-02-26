import { BrowserWindow, Menu, Tray, app } from "electron";
import path from "path";
import { getDirname } from "../utils";
import { isProd } from "../utils";
import log from "../logger";

const dirname = getDirname(import.meta.url);
const preloadBuild = path.join(dirname, "preload.js");
const env = process.env;
const rendererBuild = path.join(dirname, "../dist/index.html");
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
    titleBarStyle: "default", // "hidden"
    webPreferences: {
      preload: preloadBuild,
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.webContents.on("preload-error", (_event, preloadPath, error) => {
    log.error("[PRELOAD ERROR]:", preloadPath, error);
  });
  if (isProd) {
    mainWindow.loadFile(rendererBuild);
  } else if (env.DEV_SERVER_URL) {
    mainWindow.loadURL(env.DEV_SERVER_URL);
  } else {
    throw new Error("DEV_SERVER_URL is not set in development mode");
  }

  Menu.setApplicationMenu(null);

  if (!isProd) {
    mainWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    });
  }
};

export const addTray = () => {
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: "quit", click: () => app.quit() },
  ]);
  tray.setToolTip("test");
  tray.setContextMenu(contextMenu);
};

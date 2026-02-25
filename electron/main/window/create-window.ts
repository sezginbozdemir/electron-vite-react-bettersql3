import { BrowserWindow, Menu, Tray, app } from "electron";
import path from "path";
import { getDirname } from "../utils";
import { isProd } from "../utils";
import log from "../logger";

const dirname = getDirname(import.meta.url);
const preloadIndex = path.join(dirname, "preload.js");
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
    titleBarStyle: "default", // "hidden"
    webPreferences: {
      preload: preloadIndex,
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.webContents.on("preload-error", (_event, preloadPath, error) => {
    log.error("[PRELOAD ERROR]:", preloadPath, error);
  });
  if (env.NODE_ENV === "development" && env.DEV_SERVER_URL) {
    mainWindow.loadURL(env.DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(electronBuild);
  }

  Menu.setApplicationMenu(null);

  if (env.NODE_ENV === "development") {
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

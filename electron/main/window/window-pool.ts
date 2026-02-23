import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
} from "electron";

export default class WindowPool {
  private browserOpts: BrowserWindowConstructorOptions;
  private loadTarget: string | (() => string);
  private inUse: Set<BrowserWindow> = new Set();
  public available: BrowserWindow[] = [];

  constructor(
    browserOpts: BrowserWindowConstructorOptions,
    loadTarget: string | (() => string),
  ) {
    this.browserOpts = browserOpts;
    this.loadTarget = loadTarget;
    this.createAndPrepare();
  }

  private createWindow(): BrowserWindow {
    const opts: BrowserWindowConstructorOptions = {
      ...this.browserOpts,
      show: false,
    };
    const win = new BrowserWindow(opts);
    console.log("create", win.id);

    win.once("closed", () => {
      console.log("closed", win.id, win.isDestroyed());
      this.inUse.delete(win);
      win.destroy?.();
    });
    return win;
  }

  private async createAndPrepare(): Promise<void> {
    const win = this.createWindow();
    this.available.push(win);
    const target =
      typeof this.loadTarget === "function"
        ? this.loadTarget()
        : this.loadTarget;

    try {
      await win.loadURL(target);
    } catch (e) {
      console.error("error on load url:", target);
    }
  }

  public async acquire(): Promise<BrowserWindow> {
    if (this.available.length === 0) {
      await this.createAndPrepare();
    }

    const win = this.available.shift()!;
    this.createAndPrepare();
    this.inUse.add(win);
    win.show();
    return win;
  }

  public destroyAll(): void {
    this.available.forEach((win) => {
      if (!win.isDestroyed()) win.destroy();
    });
    this.inUse.forEach((win) => {
      if (!win.isDestroyed()) win.destroy();
    });
    this.available = [];
    this.inUse.clear();
  }
}

let pool: WindowPool;

export const initWindowPool = (): WindowPool => {
  pool = new WindowPool(
    { width: 800, height: 600, webPreferences: { nodeIntegration: true } },
    "about:blank",
  );

  ipcMain.handle("open-window", async () => {
    const win = await pool.acquire();
    return win.id;
  });

  return pool;
};

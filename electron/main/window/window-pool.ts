import {
  BrowserWindow,
  type BrowserWindowConstructorOptions,
  ipcMain,
} from "electron";
import log from "../logger";

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
    log.info("WindowPool initialized");
    this.createAndPrepare();
  }

  private createWindow(): BrowserWindow {
    const win = new BrowserWindow({ ...this.browserOpts, show: false });
    log.info(`WindowPool | window created | id: ${win.id}`);

    win.once("closed", () => {
      log.info(`WindowPool | window closed | id: ${win.id}`);
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
      log.info(`WindowPool | window ready | id: ${win.id} | url: ${target}`);
    } catch (error) {
      log.error(
        `WindowPool | failed to load URL | id: ${win.id} | url: ${target} | error: ${error}`,
      );
    }
  }

  public async acquire(): Promise<BrowserWindow> {
    if (this.available.length === 0) {
      log.warn(
        "WindowPool | no available windows, creating a new one on demand",
      );
      await this.createAndPrepare();
    }

    const win = this.available.shift()!;
    this.inUse.add(win);
    win.show();

    log.info(
      `WindowPool | window acquired | id: ${win.id} | inUse: ${this.inUse.size} | available: ${this.available.length}`,
    );

    this.createAndPrepare(); // pre-warm next window
    return win;
  }

  public destroyAll(): void {
    log.info(
      `WindowPool | destroying all windows | available: ${this.available.length} | inUse: ${this.inUse.size}`,
    );

    this.available.forEach((win) => {
      if (!win.isDestroyed()) win.destroy();
    });
    this.inUse.forEach((win) => {
      if (!win.isDestroyed()) win.destroy();
    });

    this.available = [];
    this.inUse.clear();

    log.info("WindowPool | all windows destroyed");
  }
}

let pool: WindowPool;

export const initWindowPool = (): WindowPool => {
  log.info("WindowPool | initializing pool");

  pool = new WindowPool(
    { width: 800, height: 600, webPreferences: { nodeIntegration: true } },
    "about:blank",
  );

  ipcMain.handle("open-window", async () => {
    const win = await pool.acquire();
    log.info(`WindowPool | IPC open-window | window served | id: ${win.id}`);
    return win.id;
  });

  return pool;
};

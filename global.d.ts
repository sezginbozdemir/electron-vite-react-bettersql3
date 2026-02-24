export {};

export interface FsService {
  read(path: string): Promise<any>;
  write(path: string, content: string): Promise<any>;
  readDir(path: string): Promise<any>;
  makeDir(path: string): Promise<any>;
  remove(path: string): Promise<any>;
  rename(oldPath: string, newPath: string): Promise<any>;
  copy(src: string, dest: string): Promise<any>;
  exists(path: string): Promise<any>;
  stat(path: string): Promise<any>;
}
export type QueryResponse<T = unknown> = {
  code: number;
  message: string;
  data: T | null;
};
export interface QueryOptions {
  path: string;
  params?: Record<string, any>;
  timeout?: number;
}

interface AppUpdate {
  onUpdateMsg: (callback: (data: { code: number; data?: any }) => void) => void;
  setUrl: (url: string) => void;
  checkUpdate: () => void;
  startDownload: () => void;
  quitAndInstall: () => void;
}

interface Logger {
  warn: (msg: string) => Promise<void>;
  error: (msg: string) => Promise<void>;
  info: (msg: string) => Promise<void>;
  verbose: (msg: string) => Promise<void>;
  debug: (msg: string) => Promise<void>;
  silly: (msg: string) => Promise<void>;
}
declare interface Window {
  api: {
    db: <T = unknown>(options: QueryOptions) => Promise<QueryResponse<T>>;
    fs: FsService;
    env: "development" | "production";
    update: AppUpdate;
    logger: Logger;
    createWindow: () => Promise<string>;
  };
}

import { query } from "./db";

export const fsService = {
  read: (path: string) => query({ path: "fs/read", params: { path } }),

  write: (path: string, content: string) =>
    query({ path: "fs/write", params: { path, content } }),

  readDir: (path: string) => query({ path: "fs/readDir", params: { path } }),

  makeDir: (path: string) => query({ path: "fs/makeDir", params: { path } }),

  remove: (path: string) => query({ path: "fs/remove", params: { path } }),

  rename: (oldPath: string, newPath: string) =>
    query({ path: "fs/rename", params: { oldPath, newPath } }),

  copy: (src: string, dest: string) =>
    query({ path: "fs/copy", params: { src, dest } }),

  exists: (path: string) => query({ path: "fs/exists", params: { path } }),

  stat: (path: string) => query({ path: "fs/stat", params: { path } }),
};

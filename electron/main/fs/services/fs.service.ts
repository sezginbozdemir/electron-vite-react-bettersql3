import {
  stat,
  readFile,
  writeFile,
  readdir,
  mkdir,
  rm,
  rename,
  copyFile,
  access,
} from "fs/promises";

export class FsService {
  static read(path: string) {
    return readFile(path, "utf-8");
  }

  static write(path: string, content: string) {
    return writeFile(path, content, "utf-8");
  }

  static async readDir(path: string) {
    return readdir(path);
  }

  static makeDir(path: string) {
    return mkdir(path, { recursive: true });
  }

  static remove(path: string) {
    return rm(path, { recursive: true, force: true });
  }

  static rename(oldPath: string, newPath: string) {
    return rename(oldPath, newPath);
  }

  static copy(src: string, dest: string) {
    return copyFile(src, dest);
  }

  static exists(path: string) {
    return access(path);
  }

  static async stat(path: string) {
    return stat(path);
  }
}

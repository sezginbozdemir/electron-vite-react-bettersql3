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
import { response } from "../../utils/response";

export class FsService {
  static async read(path: string) {
    try {
      const data = await readFile(path, "utf-8");
      return response.ok({ data });
    } catch (error) {
      return response.error({
        message: `FsService | read failed | path: ${path} | error: ${error}`,
      });
    }
  }

  static async write(path: string, content: string) {
    try {
      await writeFile(path, content, "utf-8");
      return response.ok();
    } catch (error) {
      return response.error({
        message: `FsService | write failed | path: ${path} | error: ${error}`,
      });
    }
  }

  static async readDir(path: string) {
    try {
      const files = await readdir(path);
      return response.ok({ data: files });
    } catch (error) {
      return response.error({
        message: `FsService | readDir failed | path: ${path} | error: ${error}`,
      });
    }
  }

  static async makeDir(path: string) {
    try {
      await mkdir(path, { recursive: true });
      return response.ok();
    } catch (error) {
      return response.error({
        message: `FsService | makeDir failed | path: ${path} | error: ${error}`,
      });
    }
  }

  static async remove(path: string) {
    try {
      await rm(path, { recursive: true, force: true });
      return response.ok();
    } catch (error) {
      return response.error({
        message: `FsService | remove failed | path: ${path} | error: ${error}`,
      });
    }
  }

  static async rename(oldPath: string, newPath: string) {
    try {
      await rename(oldPath, newPath);
      return response.ok();
    } catch (error) {
      return response.error({
        message: `FsService | rename failed | oldPath: ${oldPath} | newPath: ${newPath} | error: ${error}`,
      });
    }
  }

  static async copy(src: string, dest: string) {
    try {
      await copyFile(src, dest);
      return response.ok();
    } catch (error) {
      return response.error({
        message: `FsService | copy failed | src: ${src} | dest: ${dest} | error: ${error}`,
      });
    }
  }

  static async exists(path: string) {
    try {
      await access(path);
      return response.ok({ data: true });
    } catch {
      return response.ok({ data: false });
    }
  }

  static async stat(path: string) {
    try {
      const stats = await stat(path);
      return response.ok({
        data: {
          size: stats.size,
          isFile: stats.isFile(),
          isDirectory: stats.isDirectory(),
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
        },
      });
    } catch (error) {
      return response.error({
        message: `FsService | stat failed | path: ${path} | error: ${error}`,
      });
    }
  }
}

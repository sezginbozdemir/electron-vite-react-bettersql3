import { existsSync } from "fs";
import path from "path";
import log from "./main/logger";
import { config } from "dotenv";

const findRoot = (): string | null => {
  let dir = path.resolve(process.cwd());

  while (true) {
    if (existsSync(path.join(dir, "package.json"))) return dir;

    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
};

export const loadEnv = (): void => {
  const root = findRoot();
  if (!root) {
    const msg = "[env-loader] Could not find project root";
    log.error(msg);
    throw new Error(msg);
  }

  const envPath = path.join(root, ".env");
  if (!existsSync(envPath)) {
    const msg = "Missing env file at the root";
    log.error(msg);
    throw new Error(msg);
  }

  config({ path: envPath });
};

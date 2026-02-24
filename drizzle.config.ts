import { defineConfig } from "drizzle-kit";
import { APP_NAME, DB_CONFIG } from "./electron/main/utils/constants";
import path, { dirname } from "path";
import { existsSync, mkdirSync } from "fs";
import log from "./electron/main/logger";

const dbPath = path.join(
  process.env.APPDATA ?? "",
  APP_NAME,
  DB_CONFIG.dbFileName,
);

export const generateDirPath = (dirString: string) => {
  try {
    const dir = dirname(dirString);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  } catch (error) {
    log.error("Database connection error:", error);
    throw error;
  }
};

generateDirPath(dbPath);

export default defineConfig({
  dialect: "sqlite",
  schema: "./electron/main/db/schema/index.ts",
  out: "./migrations",
  dbCredentials: {
    url: dbPath,
  },
});

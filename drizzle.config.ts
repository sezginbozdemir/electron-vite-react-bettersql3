import { defineConfig } from "drizzle-kit";
import { dbPath } from "./electron/main/utils";
import { dirname } from "path";
import { existsSync, mkdirSync } from "fs";
import log from "./electron/main/logger";
import { loadEnv } from "./electron/main/utils";
loadEnv();

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

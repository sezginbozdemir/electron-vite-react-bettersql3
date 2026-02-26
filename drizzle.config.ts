import { defineConfig } from "drizzle-kit";
import path, { dirname } from "path";
import { existsSync, mkdirSync } from "fs";
import log from "./electron/main/logger";
import { DB_CONFIG } from "./electron/main/utils/constants";

const dbPath = path.join("./__database/", DB_CONFIG.dbFileName);

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

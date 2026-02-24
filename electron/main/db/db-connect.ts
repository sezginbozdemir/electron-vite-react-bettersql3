import path from "path";
import { generateDirPath, getAppHand, getDirname } from "../utils";
import { APP_NAME, DB_CONFIG } from "../utils/constants";
import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";
import log from "../logger";
import { isProd } from "../utils";

const dirname = getDirname(import.meta.url);

const DB_PATH = path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName);

generateDirPath(DB_PATH);

const sqlite = new Database(DB_PATH, {
  timeout: DB_CONFIG.timeout,
});

export let db: BetterSQLite3Database<typeof schema>;

export const dbConnect = async () => {
  const migrationsDir = isProd
    ? path.join(dirname, "../migrations")
    : path.join(process.resourcesPath, "migrations");
  db = drizzle(sqlite, { schema });
  if (isProd) {
    try {
      migrate(db, {
        migrationsFolder: migrationsDir,
      });
    } catch (e) {
      log.error("dbConnect error ", e);
    }
  }
};

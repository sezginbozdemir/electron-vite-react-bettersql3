import path from "path";
import { generateDirPath, getAppHand, getDirname } from "../utils";
import { APP_NAME, DB_CONFIG } from "../utils/constants";
import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";
import log from "../logger";

const dirname = getDirname(import.meta.url);

const DB_PATH = path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName);

generateDirPath(DB_PATH);

const sqlite = new Database(DB_PATH, {
  timeout: DB_CONFIG.timeout,
});

export let db: BetterSQLite3Database<typeof schema>;

export const dbConnect = async () => {
  db = drizzle(sqlite, { schema });
  log.info("db-connect", process.env.NODE_ENV);
  log.info("db-connect", path.join(dirname, "../../../migrations"));
  if (process.env.NODE_ENV === "production") {
    try {
      migrate(db, {
        migrationsFolder: path.join(dirname, "../../../migrations"),
      });
    } catch (e) {
      log.error("dbConnect error ", e);
    }
  }
};

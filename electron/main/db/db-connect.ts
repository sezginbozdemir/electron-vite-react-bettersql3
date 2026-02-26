import path from "path";
import { getDirname } from "../utils";
import { DB_CONFIG } from "../utils/constants";
import { getDbPath } from "../utils";
import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";
import log from "../logger";
import { isProd } from "../utils";
import { mkdirSync } from "fs";

const dirname = getDirname(import.meta.url);

const dbPath = getDbPath();
mkdirSync(path.dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath, {
  timeout: DB_CONFIG.timeout,
});

export let db: BetterSQLite3Database<typeof schema>;

export const dbConnect = async () => {
  const migrationsDir = isProd
    ? path.join(process.resourcesPath, "migrations")
    : path.join(dirname, "../migrations");
  db = drizzle(sqlite, { schema });

  try {
    migrate(db, {
      migrationsFolder: migrationsDir,
    });
  } catch (e) {
    log.error("dbConnect error ", e);
  }
};

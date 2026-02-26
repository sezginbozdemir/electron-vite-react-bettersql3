import { defineConfig } from "drizzle-kit";
import path from "path";
import { DB_CONFIG } from "./electron/main/utils/constants";
const dbPath = path.join("./__database/", DB_CONFIG.dbFileName);

export default defineConfig({
  dialect: "sqlite",
  schema: "./electron/main/db/schema/index.ts",
  out: "./migrations",
  dbCredentials: {
    url: dbPath,
  },
});

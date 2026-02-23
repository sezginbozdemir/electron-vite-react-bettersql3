import { dbConnect } from "./db/db-connect";

export const dbInit = async () => {
  await import("./db/handlers/index");
  await dbConnect();
};

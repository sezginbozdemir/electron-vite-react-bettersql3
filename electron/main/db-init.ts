import { dbConnect } from "./db/db-connect";

export const dbInit = async () => {
  await import("./db/controller/index");
  await dbConnect();
};

import db from "../db";
import { addDefaultTags } from "./Tags";

export const syncDatabase = async () => {
  try {
    await db.sync({ alter: true });
    await addDefaultTags();
  } catch (error) {
    console.error("Error:", error);
  }
};

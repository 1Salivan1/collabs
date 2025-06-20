import express from "express";
import cors from "cors";
import db from "./db";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import tagRoutes from "./routes/tagRoutes";
import { syncDatabase } from "./models";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(projectRoutes);
app.use(tagRoutes);

const start = async () => {
  try {
    await db.authenticate();
    syncDatabase();
    console.log("Connected to PostgreSQL database with Sequelize!");

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();

import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  createProject,
  deleteProject,
  updateProject,
  getProjects,
  getOneProject,
  getMyProjects,
} from "../controllers/ProjectController";

const router = Router();

router.get("/project/:id", getOneProject);

router.get("/projects", getProjects);

router.get("/my-projects", checkAuth, getMyProjects);

router.post("/project", checkAuth, createProject);

router.delete("/project/:id", checkAuth, deleteProject);

router.patch("/project/:id", checkAuth, updateProject);

export default router;

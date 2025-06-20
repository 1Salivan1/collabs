import { Router } from "express";
import { getTags } from "../controllers/TagsController";

const router = Router();

router.get("/tags", getTags);

export default router;

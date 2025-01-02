import { Router } from "express";
import { searchUser } from "../controllers/userController.js";

const router = Router();

router.get("/search", searchUser);

export default router;

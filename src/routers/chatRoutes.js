import { Router } from "express";
import { getMainChat, sendMessage, startPrivateChat } from "../controllers/chatController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

router.get("/main", authenticateToken, getMainChat);
router.post("/message", authenticateToken, sendMessage);
router.post("/private", authenticateToken, startPrivateChat);

export default router;

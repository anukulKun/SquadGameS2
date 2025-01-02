import { Router } from "express";
import { getMainChat, sendMessage, startPrivateChat } from "../controllers/chatController.js";

const router = Router();

router.get("/main", getMainChat);
router.post("/message", sendMessage);
router.post("/private", startPrivateChat);

export default router;

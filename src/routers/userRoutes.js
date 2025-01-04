import { Router } from "express";
import { generateToken } from "../middlewares/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required." });
  }

  const token = generateToken(walletAddress);
  res.status(200).json({ token });
});

router.get("/search", searchUser);

export default router;

import { Router } from "express";
import {
  voteShape,
  getShapes,
  getMostVotedShape,
  eliminateVoters,
} from "../controllers/games/shapes/shapesController.js";

const router = Router();

router.post("/vote", voteShape);  // Vote for a shape
router.get("/", getShapes);  // Get all shapes and their votes
router.get("/most-voted", getMostVotedShape);  // Get the most voted shape
router.post("/eliminate", eliminateVoters);  // Eliminate voters of the most voted shape

export default router;

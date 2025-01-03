import { SHAPES } from "../../../utils/constants.js";
import Vote from "../../../models/games/shapes/voteModel.js";

export async function voteShape(req, res) {
  const { shapeName, voterId } = req.body;

  try {
    if (!SHAPES.includes(shapeName)) {
      return res.status(400).json({ error: "Invalid shape" });
    }

    // Check if the voter has already voted for this shape
    const existingVote = await Vote.findOne({ shape: shapeName, voter: voterId });
    if (existingVote) {
      return res.status(400).json({ error: "You have already voted for this shape" });
    }

    // Create a new vote
    const vote = new Vote({ shape: shapeName, voter: voterId });
    await vote.save();

    res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error voting for shape:", error);
    res.status(500).json({ error: "Error voting for shape" });
  }
}

// get all shapes with no of votes
export async function getShapes(req, res) {
  try {
    const shapesWithVotes = await Promise.all(
      SHAPES.map(async (shapeName) => {
        const voteCount = await Vote.countDocuments({ shape: shapeName });
        return {
          name: shapeName,
          votes: voteCount,
        };
      })
    );

    res.status(200).json(shapesWithVotes);
  } catch (error) {
    console.error("Error getting shapes:", error);
    res.status(500).json({ error: "Error getting shapes" });
  }
}

// Get the most voted shape and its voters
export async function getMostVotedShape(req, res) {
  try {
    const shapesWithVotes = await Promise.all(
      SHAPES.map(async (shapeName) => {
        const voteCount = await Vote.countDocuments({ shape: shapeName });
        return {
          name: shapeName,
          votes: voteCount,
        };
      })
    );

    // Sort shapes by the number of votes
    const mostVotedShape = shapesWithVotes.reduce((max, shape) =>
      shape.votes > max.votes ? shape : max
    );

    res.status(200).json(mostVotedShape);
  } catch (error) {
    console.error("Error fetching most voted shape:", error);
    res.status(500).json({ error: "Error fetching most voted shape" });
  }
}

// eliminate users whho voted for most voted shape
// TODO: make this route only accessible to admin
export async function eliminateVoters(req, res) {
  try {
    const mostVotedShape = await Vote.aggregate([
      { $group: { _id: "$shape", voteCount: { $sum: 1 } } },
      { $sort: { voteCount: -1 } },
      { $limit: 1 }
    ]);

    if (!mostVotedShape.length) {
      return res.status(404).json({ error: "No shapes found" });
    }

    const voters = await Vote.find({ shape: mostVotedShape[0]._id }).populate("voter");

    // TODO: handle voter elimination logic here

    res.status(200).json({ eliminatedVoters: voters.map((vote) => vote.voter) });
  } catch (error) {
    console.error("Error eliminating voters:", error);
    res.status(500).json({ error: "Error eliminating voters" });
  }
}

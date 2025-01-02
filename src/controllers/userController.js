import User from "../models/userModel.js";

export async function searchUser(req, res) {
  const { query } = req.query;

  try {
    // Use the find method of the User model to search users by username
    const users = await User.find({
      username: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Error searching users" });
  }
}

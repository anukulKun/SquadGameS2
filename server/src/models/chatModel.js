import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  participants: {
    type: [String], // NFT numbers of participants
    required: true,
  },
  messages: [
    {
      sender: { type: String, required: true }, // NFT number
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default model("Chat", chatSchema);

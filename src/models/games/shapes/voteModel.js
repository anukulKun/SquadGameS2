import { Schema, model } from "mongoose";
import { SHAPES } from "../../../utils/constants.js";

const voteSchema = new Schema({
  shape: {
    type: String,
    required: true,
    unique: true,
    enum: SHAPES
  },
  voter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default model("Vote", voteSchema);

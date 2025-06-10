import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"user"},
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true 
  }
);

export default mongoose.model("Post", postSchema);
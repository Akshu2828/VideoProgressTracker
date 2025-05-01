import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    intervals: {
      type: [[Number]],
      required: true,
    },
    lastPosition: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Progress = mongoose.model("Progress", ProgressSchema);

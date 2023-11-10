import mongoose from "mongoose";

const ConditionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Condition", ConditionSchema);

import mongoose from "mongoose";

const ReasonSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reason", ReasonSchema);

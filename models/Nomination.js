import mongoose from "mongoose";

const NominationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    link: {
      type: Boolean,
    },
    file: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Nomination", NominationSchema);

import mongoose from "mongoose";

const NominationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Укажите почту"],
      unique: true,
    },
    link: {
      type: Boolean,
    },
    file: {
      type: Boolean,
    },
    language: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Nomination", NominationSchema);

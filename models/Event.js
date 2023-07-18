import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      // unique: true,
      trim: true,
    },
    date1: {
      type: String,
      required: [true, "Please provide date1"],
    },
    date2: {
      type: String,
      required: [true, "Please provide date2"],
    },
    description: {
      type: String,
    },
    pdf: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

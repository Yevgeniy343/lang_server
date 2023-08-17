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
    pdf: {
      type: String,
    },
    image: {
      type: String,
    },
    extra1: {
      type: String,
    },
    extra2: {
      type: String,
    },
    extra3: {
      type: String,
    },
    tarif_1: {
      type: Number,
    },
    tarif_2: {
      type: Number,
    },
    tarif_3: {
      type: Number,
    },
    supervisor: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

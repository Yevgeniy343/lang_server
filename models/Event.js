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
      required: [true, "Please provide price"],
    },
    tarif_2: {
      type: Number,
      required: [true, "Please provide price"],
    },
    tarif_3: {
      type: Number,
      required: [true, "Please provide price"],
    },
    tarif_1a: {
      type: Number,
      required: [true, "Please provide price"],
    },
    tarif_2a: {
      type: Number,
      required: [true, "Please provide price"],
    },
    tarif_3a: {
      type: Number,
      required: [true, "Please provide price"],
    },
    supervisor: {
      type: Number,
      required: [true, "Please provide price"],
    },
    diplom: {
      type: Number,
      required: [true, "Please provide price"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

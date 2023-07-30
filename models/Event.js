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
    childNom_1: {
      type: String,
    },
    childNom_2: {
      type: String,
    },
    childNom_3: {
      type: String,
    },
    childNom_4: {
      type: String,
    },
    childNom_5: {
      type: String,
    },
    childNom_6: {
      type: String,
    },
    childNom_7: {
      type: String,
    },
    childNom_8: {
      type: String,
    },
    childNom_9: {
      type: String,
    },
    childNom_10: {
      type: String,
    },
    adultNom_1: {
      type: String,
    },
    adultNom_2: {
      type: String,
    },
    adultNom_3: {
      type: String,
    },
    adultNom_4: {
      type: String,
    },
    adultNom_5: {
      type: String,
    },
    adultNom_6: {
      type: String,
    },
    adultNom_7: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

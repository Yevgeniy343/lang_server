import mongoose from "mongoose";

const DiplomSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    eventId: {
      type: String,
    },
    eventName: {
      type: String,
    },
    date1: {
      type: String,
    },
    date2: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Diplom", DiplomSchema);

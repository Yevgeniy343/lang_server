import mongoose from "mongoose";

const NomESchema = new mongoose.Schema(
  {
    childNoms: {
      type: String,
    },
    adultNoms: {
      type: String,
    },
    eventId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("NomE", NomESchema);

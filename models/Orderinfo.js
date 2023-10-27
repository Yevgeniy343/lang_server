import mongoose from "mongoose";

const OrderinfoSchema = new mongoose.Schema(
  {
    text1: {
      type: String,
    },
    text2: {
      type: String,
    },
    text3: {
      type: String,
    },
    text4: {
      type: String,
    },
    text5: {
      type: String,
    },
    text6: {
      type: String,
    },
    text7: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orderinfo", OrderinfoSchema);

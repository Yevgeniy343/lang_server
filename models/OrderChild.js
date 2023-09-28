import mongoose from "mongoose";

const OrderChildSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: [true, "Please provide eventId"],
    },
    userId: {
      type: String,
      required: [true, "Please provide userId"],
    },
    name: {
      type: String,
    },
    number: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    name2: {
      type: String,
    },
    name3: {
      type: String,
    },
    tarif: {
      type: String,
    },
    part: {
      type: String,
    },
    curatorsAmount: {
      type: String,
    },
    cur: {
      type: String,
    },
    age: {
      type: String,
    },
    subject: {
      type: String,
    },
    punct: {
      type: String,
    },
    graduate: {
      type: String,
    },
    nomPul: {
      type: String,
    },
    language: {
      type: String,
    },
    language2: {
      type: String,
    },
    link: {
      type: String,
    },
    file: {
      type: String,
    },
    file2: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
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
    number: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("OrderChild", OrderChildSchema);

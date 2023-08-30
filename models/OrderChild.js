import mongoose from "mongoose";

const OrderChildSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: [true, "Please provide eventId"],
    },
    name: {
      type: String,
    },
    name2: {
      type: String,
    },
    name3: {
      type: String,
    },
    part: {
      type: String,
    },
    curatorsAmount: {
      type: String,
    },
    cur: {
      type: Array,
      cf1: {
        type: String,
      },
      cd1: {
        type: String,
      },
      cf2: {
        type: String,
      },
      cd2: {
        type: String,
      },
      cf3: {
        type: String,
      },
      cd3: {
        type: String,
      },
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
  },
  { timestamps: true }
);

export default mongoose.model("OrderChild", OrderChildSchema);

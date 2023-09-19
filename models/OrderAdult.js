import mongoose from "mongoose";

const OrderAdultSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: [true, "Please provide eventId"],
    },
    status: {
      type: String,
      default: "pending",
    },
    number: {
      type: String,
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
      type: String,
    },
    age: {
      type: String,
    },
    subject: {
      type: String,
    },
    subject2: {
      type: String,
    },
    subject3: {
      type: String,
    },
    punct: {
      type: String,
    },
    punct2: {
      type: String,
    },
    punct3: {
      type: String,
    },
    job: {
      type: String,
    },
    job2: {
      type: String,
    },
    job3: {
      type: String,
    },
    job_title: {
      type: String,
    },
    job_title2: {
      type: String,
    },
    job_title3: {
      type: String,
    },
    internship: {
      type: String,
    },
    internship2: {
      type: String,
    },
    internship3: {
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

export default mongoose.model("OrderAdult", OrderAdultSchema);

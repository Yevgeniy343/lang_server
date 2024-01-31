import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Укажите имя"],
      // unique: true,
      trim: true,
    },
    date1: {
      type: String,
      required: [true, "Укажите дату"],
    },
    date2: {
      type: String,
      required: [true, "Укажите дату"],
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
      required: [true, "Укажите тарифы"],
    },
    tarif_2: {
      type: Number,
      required: [true, "Укажите тарифы"],
    },
    tarif_3: {
      type: Number,
      required: [true, "Укажите тарифы"],
    },
    tarif_1a: {
      type: Number,
      required: [true, "Укажите тарифы"],
    },
    tarif_2a: {
      type: Number,
      required: [true, "Укажите тарифы"],
    },
    tarif_3a: {
      type: Number,
      required: [true, "Укажите тарифы"],
    },
    supervisor: {
      type: Number,
      required: [true, "Укажите тарифы"],
    },
    diplom: {
      type: Number,
      required: [true, "Укажите тарифы"],
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

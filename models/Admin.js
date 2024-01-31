import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "Укажите почту"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Укажите пароль"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);

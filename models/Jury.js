import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JurySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide name"], trim: true },
    // second_name: { type: String, trim: true },
    // phone: {
    //   type: String,
    // },
    // date: {
    //   type: String,
    // },
    // city: {
    //   type: String,
    // },
    // job: {
    //   type: String,
    // },
    // job_title: {
    //   type: String,
    // },

    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      trim: true,
    },
    // referal: {
    //   type: String,
    // },
    // from_ref: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

JurySchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

JurySchema.methods.createJWT = function () {
  return jwt.sign({ juryId: this._id }, "jwtSecret", { expiresIn: "1h" });
};

JurySchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Jury", JurySchema);

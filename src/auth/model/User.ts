import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserStructure } from "../types/types.js";

const userSchema = new Schema<IUserStructure>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },

  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

const User = model<IUserStructure>("User", userSchema);

export default User;

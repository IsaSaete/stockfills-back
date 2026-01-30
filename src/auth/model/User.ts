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
    username: {
      type: String,
      required: true,
      trim: true,
    },
  },

  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.statics.findByEmailWithPassword = function (email: string) {
  return this.findOne({ email }).select("+password");
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

const User = model<IUserStructure>("User", userSchema);

export default User;

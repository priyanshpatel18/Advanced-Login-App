import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
  _id: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  publicId: string;
  phoneNumber: string;
}

const userSchema = new Schema<UserDocument>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
    contentType: String,
  },
  publicId: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

userSchema.pre<UserDocument>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

const User = model("User", userSchema);

export default User;

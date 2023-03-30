import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String },
  urlImg: { type: String },
});

const User = mongoose.model("User", UserSchema);

export default User;

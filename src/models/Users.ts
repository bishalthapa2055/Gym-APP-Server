import mongoose, { Document, Schema } from "mongoose";

export interface IUsers {
  name: string;
  email?: string;
  phone: string;
  emergency_number: string;
  isAdmin: boolean;
  image: string;
}

export interface IUsersModel extends IUsers, Document {}

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  emergency_number: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // membership: { type: Schema.Types.ObjectId, ref: "Membership" },
});

export default mongoose.model<IUsersModel>("Users", UserSchema);

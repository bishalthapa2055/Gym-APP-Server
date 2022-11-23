import mongoose, { Document, ObjectId, Schema } from "mongoose";
import Users from "./Users";
export interface IMembership {
  //   userId: string;
  start_date: string;
  end_date: string;
  // package: [];
  // payment: string;
}

export interface IMembershipModel extends IMembership, Document {}

const MembershipSchema: Schema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users" },

  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  package: {
    type: mongoose.Types.ObjectId,
    ref: "Packages",
  },

  payment: { type: mongoose.Types.ObjectId, ref: "Payment" },
  // payment: { type: String },
});

export default mongoose.model<IMembershipModel>("Membership", MembershipSchema);

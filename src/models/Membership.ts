// import mongoose, { Document, ObjectId, Schema } from "mongoose";
// import Users from "./Users";
// export interface IMembership {
//   //   userId: string;
//   start_date: string;
//   end_date: string;
//   // package: [];
//   // payment: string;
// }

// export interface IMembershipModel extends IMembership, Document {}

// const MembershipSchema: Schema = new mongoose.Schema({
//   userId: { type: Schema.Types.ObjectId, ref: "Users" },

//   start_date: {
//     type: String,
//     required: true,
//   },
//   end_date: {
//     type: String,
//     required: true,
//   },
//   package: {
//     type: mongoose.Types.ObjectId,
//     ref: "packages",
//   },

//   payment: { type: mongoose.Types.ObjectId, ref: "Payment" },
//   // payment: { type: String },
// });

// export default mongoose.model<IMembershipModel>("Membership", MembershipSchema);

import mongoose, { ObjectId } from "mongoose";

export interface MembershipAttrs {
  start_date: string;
  end_date: string;
}

interface MembershipModel extends mongoose.Model<MembershipDoc> {
  build(attrs: MembershipAttrs): MembershipDoc;
}

export interface MembershipDoc extends mongoose.Document, MembershipAttrs {
  start_date: string;
  end_date: string;
  userId: ObjectId;
  package: ObjectId;
  payment: ObjectId;
}
const MembershipSchema = new mongoose.Schema<MembershipDoc>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },

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
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

MembershipSchema.statics.build = (attrs: MembershipAttrs) => {
  return new Membership(attrs);
};

const Membership = mongoose.model<MembershipDoc, MembershipModel>(
  "Membership",
  MembershipSchema
);
export default Membership;

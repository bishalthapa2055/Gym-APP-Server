import mongoose, { Document, Schema } from "mongoose";

export interface IUsers {
  name: string;
  email?: string;
  phone: string;
  emergency_number: string;
  isAdmin: boolean;
  // image: string;
}

export interface IUsersModel extends IUsers, Document {
  name: string;
  email: string;
  phone: string;
  emergency_number: string;
  isAdmin: boolean;
  // image: string;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
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
      default:
        "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fbitpointx.s3-ap-southeast-1.amazonaws.com%2Fconfig%2Ftransparent_logo.png",
    },
    created: {
      type: String,
      required: true,
      // default: Date.now,
    },

    // membership: { type: Schema.Types.ObjectId, ref: "Membership" },
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
UserSchema.index(
  { name: "text", phone: "text", email: "text" },
  { weights: { name: 10, phone: 10, email: 10 } }
);
// UserSchema.index({ title: "text", subtitle: "text", model_type: "text" });

export default mongoose.model<IUsersModel>("Users", UserSchema);

// import crypto from "crypto";
// import mongoose from "mongoose";
// // import { Role } from "../common/types/role";
// // import { Password } from "../services/password";
// // An interface that describes the properties
// // that are requried to create a new User
// export interface UserAttrs {
//   name: string;
//   email?: string;
//   phone: string;
//   emergency_number: string;
//   isAdmin: boolean;
//   image: string;
// }
// // An interface that describes the properties
// // that a User Model has
// interface UserModel extends mongoose.Model<UserDoc> {
//   build(attrs: UserAttrs): UserDoc;
// }
// // An interface that describes the properties
// // that a User Document has
// export interface UserDoc extends mongoose.Document, UserAttrs {
//   name: string;
//   email?: string;
//   phone: string;
//   emergency_number: string;
//   isAdmin: boolean;
//   image: string;
// }
// const userSchema = new mongoose.Schema<UserDoc>(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,

//       lowercase: true,
//     },
//     phone: {
//       type: String,
//     },
//     emergency_number: {
//       type: String,
//     },
//     // photoUrl: {
//     //   type: String,
//     //   default:
//     //     "https://bitpointx.s3-ap-southeast-1.amazonaws.com/config/transparent_logo.png",
//     // },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     created: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },
//   },
//   // {
//   //   toJSON: {
//   //     transform(doc, ret) {
//   //       ret.id = ret._id;
//   //       delete ret._id;
//   //       delete ret.password;
//   //       delete ret.__v;
//   //     },
//   //   },
//   //   timestamps: true,
//   // }
// );

// userSchema.statics.build = (attrs: UserAttrs) => {
//   return new Users(attrs);
// };

// const Users = mongoose.model<UserDoc, UserModel>("Users", userSchema);
// export default Users;

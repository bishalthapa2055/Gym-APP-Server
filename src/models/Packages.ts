import mongoose, { Document, Schema } from "mongoose";

export enum Typestatus {
  draft = "draft",
  published = "published",
}
export interface IPackages {
  discount_percentage: string;
  duration_in_days: string;
  name: string;
  photo_url?: "";
  price: number;
  status: Typestatus;
}

export interface IPackagesModel extends IPackages, Document {
  discount_percentage: string;
  duration_in_days: string;
  name: string;
  photo_url?: "";
  price: number;
  status: Typestatus;
  created_at: Date;
  updated_at: Date;
}

const PackagesSchema: Schema = new Schema(
  {
    discount_percentage: {
      type: String,
      required: true,
      default: 12.5,
    },
    duration_in_days: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo_url: {
      type: String,
      required: true,
      default:
        "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fbitpointx.s3-ap-southeast-1.amazonaws.com%2Fconfig%2Ftransparent_logo.png",
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      emum: Typestatus,
      default: Typestatus.draft,
    },
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

PackagesSchema.index({ name: "text" });
export default mongoose.model<IPackagesModel>("Packages", PackagesSchema);

// import mongoose, { ObjectId } from "mongoose";

// export enum Typestatus {
//   draft = "draft",
//   published = "published",
// }
// export interface IPackages {
//   discount_percentage: string;
//   duration_in_days: string;
//   name: string;
//   photo_url?: "";
//   price: string;
//   status: Typestatus;
// }

// interface PackagesModel extends mongoose.Model<PackagesDoc> {
//   build(attrs: PackagesAttrs): PackagesDoc;
// }

// export interface PackagesDoc extends mongoose.Document, PackagesAttrs {
//   discount_percentage: string;
//   duration_in_days: string;
//   name: string;
//   photo_url?: "";
//   price: string;
//   status: Typestatus;
//   created_at: Date;
//   updated_at: Date;
// }
// const PackagesSchema = new mongoose.Schema<PackagesDoc>(
//   {
//     discount_percentage: {
//       type: String,
//       required: true,
//       default: 12.5,
//     },
//     duration_in_days: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     photo_url: {
//       type: String,
//       required: true,
//       default:
//         "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fbitpointx.s3-ap-southeast-1.amazonaws.com%2Fconfig%2Ftransparent_logo.png",
//     },
//     price: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       emum: Typestatus,
//       default: Typestatus.draft,
//     },
//   },
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//       },
//     },
//     timestamps: true,
//   }
// );

// PackagesSchema.statics.build = (attrs: PackagesAttrs) => {
//   return new Packages(attrs);
// };

// const Membership = mongoose.model<PackagesDoc, PackagesModel>(
//   "Packages",
//   Packages
// );
// export default Packages;

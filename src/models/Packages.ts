import mongoose, { Document, Schema } from "mongoose";

export interface IPackages {
  discount_percentage: string;
  duration_in_days: string;
  name: string;
  photo_url?: "";
  price: string;
}

export interface IPackagesModel extends IPackages, Document {}

const PackagesSchema: Schema = new Schema({
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
  photo_url: { type: String, required: true },
  price: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPackagesModel>("Packages", PackagesSchema);

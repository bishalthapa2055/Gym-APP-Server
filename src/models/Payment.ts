import mongoose, { Document, Schema, ObjectId } from "mongoose";

export enum paymentMethodEnum {
  fonepay = "fonepay",
  esewa = "esewa",
  khalti = "khalti",
  bank = "bank",
}

// export enum PackageEnum {
//   one = "1 month",
//   three = "3 months",
//   year = "12 months",
// }

export interface IPayment {
  amount: string;
  // userId: ObjectId;
  // processed_by: ObjectId;
  // userId: string;
  // processed_by: string;
  paid_via: paymentMethodEnum;
  // packages: PackageEnum;
}

export interface IPaymentModel extends IPayment, Document {}

const PaymentSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  amount: {
    type: String,
    required: true,
  },
  processed_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  paid_via: {
    type: String,
    enum: paymentMethodEnum,
    default: paymentMethodEnum.esewa,
  },
  packages: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Packages",
  },
});

export default mongoose.model<IPaymentModel>("Payment", PaymentSchema);

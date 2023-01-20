import mongoose, { Document, Schema, ObjectId } from "mongoose";

export enum paymentMethodEnum {
  cash = "cash",
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
  userId: ObjectId;
  processed_by: ObjectId;
  // userId: string;
  // processed_by: string;
  paid_via: paymentMethodEnum;
  package: ObjectId;
}

export interface IPaymentModel extends IPayment, Document {}

const PaymentSchema: Schema = new Schema(
  {
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
    package: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Packages",
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

export default mongoose.model<IPaymentModel>("Payment", PaymentSchema);

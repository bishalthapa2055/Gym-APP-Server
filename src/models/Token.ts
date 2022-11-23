import mongoose, { Document, Schema } from "mongoose";

export interface IToken {
  number: string;
}

export interface ITokenModel extends IToken, Document {}

const TokenSchema: Schema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ITokenModel>("Token", TokenSchema);

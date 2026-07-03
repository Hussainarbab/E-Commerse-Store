import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: Array<{ product: mongoose.Types.ObjectId; quantity: number }>;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
  }],
}, { timestamps: true });

export const Cart = mongoose.model<ICart>('Cart', cartSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  order: mongoose.Types.ObjectId;
  pdfUrl?: string;
  createdAt: Date;
}

const invoiceSchema = new Schema<IInvoice>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  pdfUrl: { type: String },
}, { timestamps: true });

export const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema);

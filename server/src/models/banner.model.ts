import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  active: boolean;
}

const bannerSchema = new Schema<IBanner>({
  title: { type: String, required: true },
  subtitle: { type: String },
  imageUrl: { type: String, required: true },
  link: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Banner = mongoose.model<IBanner>('Banner', bannerSchema);

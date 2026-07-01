import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  parent?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });

export const Category = mongoose.model<ICategory>('Category', categorySchema);

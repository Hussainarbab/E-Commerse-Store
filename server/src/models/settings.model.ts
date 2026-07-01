import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  logo?: string;
  socials: { facebook?: string; instagram?: string; twitter?: string };
  emailSettings?: { smtpHost?: string; smtpUser?: string };
  homepageSettings?: { heroTitle?: string; heroSubtitle?: string };
}

const settingsSchema = new Schema<ISettings>({
  siteName: { type: String, default: 'LuxeCart' },
  logo: { type: String },
  socials: { type: Object, default: {} },
  emailSettings: { type: Object, default: {} },
  homepageSettings: { type: Object, default: {} },
}, { timestamps: true });

export const Settings = mongoose.model<ISettings>('Settings', settingsSchema);

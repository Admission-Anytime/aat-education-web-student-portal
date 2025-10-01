import { Schema, model } from 'mongoose';

// Schema for individual link
const LinkSchema = new Schema({
  text: { type: String, required: true },
  href: { type: String, required: true }
}, { _id: false });

// Schema for footer sections
const FooterSectionSchema = new Schema({
  title: { type: String, required: true },
  iconSvg: { type: String, default: '' }, // raw SVG markup
  links: { type: [LinkSchema], default: [] },
  order: { type: Number, default: 0 }
}, { _id: false });

// Main Footer Schema
const FooterSchema = new Schema({
  mainLinks: { type: [LinkSchema], default: [] }, // top row links
  sections: { type: [FooterSectionSchema], default: [] }, // footer sections
  copyrightText: { type: String, default: '' }
}, { timestamps: true });

export default model('Footer', FooterSchema);

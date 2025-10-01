import { Schema, model } from "mongoose";

const WebsiteInfoSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Website/Institute name
      trim: true,
    },
    about: {
      type: String,
      required: true, // About section
      trim: true,
    },
  },
  { timestamps: true } // add createdAt & updatedAt fields
);

export default model("WebsiteInfo", WebsiteInfoSchema);

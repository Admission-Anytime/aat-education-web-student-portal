import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    whatsapp: {
      type: String,    //Stored as string to preserve leading zeros
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;

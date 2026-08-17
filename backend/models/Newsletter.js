import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // ek email sirf ek dafa subscribe ho sakta hai
  },
  { timestamps: true }
);

export default mongoose.model("Newsletter", newsletterSchema);
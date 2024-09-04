import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    pinCode: String,
    phone: String,
    notes: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Address =
  mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default Address;

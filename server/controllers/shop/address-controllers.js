import Address from "../../models/Address.js";
import { addressSchema } from "../../schemas/address-schemas.js";
import { validateData } from "./../../helpers/validateData.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pinCode, phone, notes } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User id is required",
      });
    }

    const error = validateData(addressSchema, {
      address,
      city,
      pinCode,
      phone,
      notes,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pinCode,
      notes,
      phone,
    });
    await newlyCreatedAddress.save();
    return res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
      message: "Address added successfully",
    });
  } catch (error) {
    console.log("Error in addAddress function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const fetchAllAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User id is required",
      });
    }

    const addressList = await Address.find({ userId });
    return res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log("Error in fetchAllAddress function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        error: "User and address id is required",
      });
    }

    const error = validateData(addressSchema, formData);
    if (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        error: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
      message: "Address updated successfully",
    });
  } catch (error) {
    console.log("Error in editAddress function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        error: "User and address id is required",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        error: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteAddress function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

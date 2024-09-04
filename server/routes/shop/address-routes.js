import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "../../controllers/shop/address-controllers.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddresses);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

export default router;

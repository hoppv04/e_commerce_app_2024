import express from "express";
import {
  getAllOrders,
  getOrderDetailsForAdmin,
  updateOderStatus,
} from "../../controllers/admin/order-controllers.js";

const router = express.Router();

router.get("/get", getAllOrders);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOderStatus);

export default router;

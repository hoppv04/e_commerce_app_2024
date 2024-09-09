import Order from "./../../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        error: "No orders found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("Error in getAllOrdersByUser function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log("Error in getOrderDetails function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const updateOderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });
    return res.status(200).json({
      success: true,
      message: "Order status is updated successfully",
    });
  } catch (error) {
    console.log("Error in updateOderStatus function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

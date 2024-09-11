import ProductReview from "../../models/Review.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });
    if (!order) {
      return res.status(403).json({
        success: false,
        error: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });
    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        error: "You already reviewed thi product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();
    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    return res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log("Error in addProductReview function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log("Error in getProductReview function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

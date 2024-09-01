import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";
import { productSchema } from "../../schemas/product-schema.js";
import { validateData } from "../../helpers/validateData.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Error in handleImageUpload function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const error = validateData(productSchema, {
      title,
      category,
      brand,
      price,
      totalStock,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log("Error in addProduct function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    return res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log("Error in fetchAllProducts function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    const error = validateData(productSchema, {
      title,
      category,
      brand,
      price,
      totalStock,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    return res.status(200).json({
      success: true,
      message: "Product edited successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log("Error in editProduct function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

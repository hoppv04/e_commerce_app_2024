import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().required().trim().messages({
    "string.empty": "Title is required.",
    "any.required": "Title is required.",
  }),
  category: Joi.string().required().trim().messages({
    "string.empty": "Category is required.",
    "any.required": "Category is required.",
  }),
  brand: Joi.string().required().trim().messages({
    "string.empty": "Brand is required.",
    "any.required": "Brand is required.",
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "Price must be a number.",
    "number.min": "Price must be at least 0.",
    "any.required": "Price is required.",
  }),
  totalStock: Joi.number().required().min(0).messages({
    "number.base": "Total stock must be a number.",
    "number.min": "Total stock must be at least 0.",
    "any.required": "Total stock is required.",
  }),
});

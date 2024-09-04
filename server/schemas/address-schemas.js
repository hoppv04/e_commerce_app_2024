import Joi from "joi";

export const addressSchema = Joi.object({
  address: Joi.string().required().messages({
    "string.empty": "Address is required.",
    "any.required": "Address is a required field.",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is required.",
    "any.required": "City is a required field.",
  }),
  pinCode: Joi.string().required().messages({
    "string.empty": "Pin code is required.",
    "any.required": "Pin code is a required field.",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Phone number is required.",
    "any.required": "Phone number is a required field.",
  }),
  notes: Joi.string().required().messages({
    "string.empty": "Notes are required.",
    "any.required": "Notes are a required field.",
  }),
});

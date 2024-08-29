import Joi from "joi";

export const registerSchema = Joi.object({
  userName: Joi.string().required().trim().messages({
    "string.empty": "Username cannot be empty.",
    "string.base": "Username must be a string.",
    "any.required": "Username is required.",
  }),

  email: Joi.string().required().trim().email().messages({
    "string.empty": "Email cannot be empty.",
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().required().trim().min(6).messages({
    "string.empty": "Password cannot be empty.",
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().trim().email().messages({
    "string.empty": "Email cannot be empty.",
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().required().trim().min(6).messages({
    "string.empty": "Password cannot be empty.",
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
});

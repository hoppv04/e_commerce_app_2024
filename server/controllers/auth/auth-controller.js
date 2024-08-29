import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { loginSchema, registerSchema } from "../../schemas/auth-schemas.js";
import { validateData } from "../../helpers/validateData.js";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  const error = validateData(registerSchema, { userName, email, password });
  if (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists with the same email! Please try again",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Registration successfully",
    });
  } catch (error) {
    console.log("Error in register function", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const error = validateData(loginSchema, { email, password });
  if (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        error: "User doesn't exists! Please register first",
      });
    }

    const checkPasswordMatch = await bcryptjs.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.status(400).json({
        success: false,
        error: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      { id: checkUser._id, role: checkUser.role, email: checkUser.email },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    console.log("Error in login function", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout function", error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in logout function", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

import express from "express";
import {
  authMiddleWare,
  login,
  logout,
  register,
} from "../../controllers/auth/auth-controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleWare, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "Authenticated user",
    user,
  });
});

export default router;

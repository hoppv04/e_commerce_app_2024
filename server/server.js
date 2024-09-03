import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectMongoDB from "./configs/connectDB.js";
import authRouter from "./routes/auth/auth-routes.js";
import adminProductRouter from "./routes/admin/product-routes.js";
import shopProductRouter from "./routes/shop/product-routes.js";
import shopCartRouter from "./routes/shop/cart-routes.js";

dotenv.config();

connectMongoDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

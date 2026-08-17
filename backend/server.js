import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config()
connectDb()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/products", productRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads")); 

app.get("/", (req, res) => {
  res.send("Watch store backend start")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chal raha hai: http://localhost:${PORT}`));
import express from "express"
import mongoose from "mongoose"
// import dotenv from "dotenv"
import "dotenv/config";
import cookieParser from "cookie-parser"
import customerRoutes from "./routes/customers.routes.js"
import productRoutes from "./routes/products.routes.js"
import cors from'cors'
import { createProduct } from "./controllers/product.controller.js"
import orderRoutes from "./routes/orders.routes.js"
// dotenv.config();
const app = express();
mongoose.connect(process.env.dbUrl).then(() => {
    console.log("DB connected");
}).catch((error) => {
    console.log(error);
});

app.use(cors({
origin:"http://localhost:5173",
credentials:true
}))
app.use(express.json());
app.use(cookieParser())
app.use("/customers", customerRoutes);
app.use("/products",productRoutes);
app.use("/orders",orderRoutes)
app.listen(8088, (req, res) => {
    console.log("Server started at 8088");
})
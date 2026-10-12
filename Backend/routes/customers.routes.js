import express from "express";
import {
    getCustomer,
    LoginCustomer,
    registerCustomer,
    Logout, wishList,
    getWishlist,
    deleteProduct,
    addToCart,
    getCartOfCustomer,
    updateCartQuantity,
    deleteProductFromCart
}
    from "../controllers/customer.controllers.js";
import isAuthenticated from "../middlewares/authMiddleware.js";
const customerRoutes = express.Router()

customerRoutes.post("/register", registerCustomer)
customerRoutes.post("/login", LoginCustomer)
// customerRoutes.post("/login", (req, res) => {
//     console.log("🔥 LOGIN ROUTE HIT");
//     console.log(req.body);

//     res.status(200).json({
//         message: "Login route is working"
//     });
// });
customerRoutes.get("/me", isAuthenticated, getCustomer)
customerRoutes.post("/logout", Logout)
customerRoutes.post('/wishlist/:productId', isAuthenticated, wishList)
customerRoutes.get('/wishlist', isAuthenticated, getWishlist)
customerRoutes.delete('/wishlist/:productId', isAuthenticated, deleteProduct)
customerRoutes.post('/cart/:productId', isAuthenticated, addToCart)
customerRoutes.get('/cart', isAuthenticated, getCartOfCustomer)
customerRoutes.patch('/update/:productId', isAuthenticated, updateCartQuantity)
customerRoutes.delete('/cart/:productId', isAuthenticated, deleteProductFromCart)
export default customerRoutes;


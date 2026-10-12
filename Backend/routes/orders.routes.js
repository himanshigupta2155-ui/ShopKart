import express from 'express'
import { createPaymentOrder,verifyPayments,getMyOrders,getOrderById } from '../controllers/order.controllers.js'
import isAuthenticated from '../middlewares/authMiddleware.js'
const orderRoutes = express.Router()
orderRoutes.post('/create-payment-order',isAuthenticated,createPaymentOrder)
orderRoutes.post('/verify-payments',isAuthenticated,verifyPayments)
orderRoutes.get('/',isAuthenticated,getMyOrders);
orderRoutes.get('/:id',isAuthenticated,getOrderById);
export default orderRoutes
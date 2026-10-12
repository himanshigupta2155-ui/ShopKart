import Order from "../models/orders.model.js";
import Customer from "../models/customers.model.js";
import Product from "../models/Product.model.js";
import crypto from 'crypto'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const createPaymentOrder = async (req, res) => {
    try {
        // const{customerId}=req.customer;
        // const {productId}=req.params;
        const { shippingAddress } = req.body;

        // const{fullName,phone,addressLine1,city,pincode,state}=req.params;

        if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.pincode || !shippingAddress.state) {
            return res.status(400).json({ message: "All fields are mandatory" });
        }

        const customer = await Customer.findById(req.customer._id).populate("cart.product");
        if (!customer) {
            return res.status(404).json({ message: "Not found " })
        }
        if (customer.cart.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" })
        }
        const stockValidation = customer.cart.some((item) => {
            return (item.product.stock < item.quantity)
        });
        if (stockValidation === true) {
            return res.status(400).json({ message: "This product is currently out of stock" })
        }
        const subtotal = customer.cart.reduce((acc, item) => {
            return acc + item.quantity * item.product.price;
        }, 0)
        const amountInPaise = Math.round(subtotal * 100);
        const newOrderReceipt = `receipt_${req.customer._id}_${Date.now()}`;
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: newOrderReceipt,
        });
        const orderItems = customer.cart.map((item) => {
            return {
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.image

            }
        })
        const newOrder = await Order.create({
            customer: req.customer._id,
            items: orderItems,
            totalAmount: subtotal,
            shippingAddress,
            razorpayOrderId: razorpayOrder.id
        })

        return res.status(201).json({
            newOrder,
            razorpayOrderId: razorpayOrder.id,
            amount: amountInPaise,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID,
            message: "Thanks for ordering!"
        })
    
} catch (error) {
    console.error("Create payment order error:", error);
    return res.status(500).json({
        success: false,
        message: "Unable to create payment order"
    });
}
  

}

export const getMyOrders = async (req, res) => {
    try {
        const findOrder = await (Order.find({ customer: req.customer._id }).sort({ createdAt: -1 }));
        console.log("Customer ID:", req.customer._id);
        console.log("Orders found:", findOrder.length);
        return res.status(200).json({ "success": true, findOrder, message: "These are your orders" })
    } catch (error) {
        return res.status(500).json({ "success": false, message: "Unable to load your orders" })
    }
}
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "orderId not found" });
        }
        const findOrderById = await Order.findOne({
            _id: id,
            customer: req.customer._id
        });
        // if(!mongoose.isValidObjectId(findOrderById)){
        //     return res.status(400).json({message:"Inavlid order id"})
        // }
        if (!findOrderById) {
            return res.status(404).json({ message: "No order found for this order id" })
        }
        return res.status(200).json({ message: "Your order found successfully", findOrderById })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const verifyPayments = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ "success": false, message: "All fields are mandatory" })
        }
        const findOrder = await Order.findOne({
            razorpayOrderId: razorpay_order_id,
            customer: req.customer._id,
        })
        if (!findOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        const message = `${findOrder.razorpayOrderId}|${razorpay_payment_id}`
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(message)
            .digest("hex")
        if (expectedSignature === razorpay_signature) {
            if (findOrder.paymentStatus === "PAID") {
                return res.status(409).json({ message: "This order is already prpcessed" })
            }
            findOrder.paymentStatus = "PAID";
            findOrder.status = "PLACED";
            findOrder.razorpayPaymentId = razorpay_payment_id
            const customer = await Customer.findById(req.customer._id);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            await findOrder.save();
            
            customer.cart = [];
            await customer.save();
            return res.status(200).json({ message: "Signature verified!" })
        }
        else return res.status(400).json({ message: "Signature not verified!" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
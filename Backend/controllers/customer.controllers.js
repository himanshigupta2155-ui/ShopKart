import Customer from "../models/customers.model.js"
// import routes from "../routes.customer.routes.js"
import bcrypt from "bcrypt"
import genToken from "../utils/genTokens.js"
import Product from "../models/Product.model.js"

const cookieOptions = {
    httpOnly: true,
}
export const registerCustomer = async (req, res) => {
    const { fullName, email, password, phoneNo } = req.body;
    try {
        if (!fullName || !email || !password || !phoneNo) {
            return res.status(422).json({ message: "All fields are mandatory" })
        }
        const EmailExists = await Customer.findOne({ email });
        if (EmailExists) {
            return res.status(422).json({ message: "This email already exists" })
        }
        if (password.length <= 6) {
            return res.status(422).json({ message: "Password length should be greater than 6" });
        }
        const phoneNoExists = await Customer.findOne({ phoneNo });
        if (phoneNoExists) {
            return res.status(422).json({ message: "This Phone No already Exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newCustomer = await Customer.create({ fullName, email, phoneNo, password: hashedPassword })
        console.log("CUSTOMER CREATED:", newCustomer);
        const token = await genToken(newCustomer._id);
        res.cookie("token", token, cookieOptions)
        const customerData = newCustomer.toObject();
        delete customerData.password;
        res.status(200).json(customerData)
    } catch (error) {
        console.log("REGISTER ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
}
export const LoginCustomer = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(422).json({ message: "All fields are required" })
        }
        const EmailExists = await Customer.findOne({ email })
        if (!EmailExists) {
            return res.status(401).json({ message: "No such email exists" })
        }

        const correctPassword = await bcrypt.compareSync(password, EmailExists.password);
        if (!correctPassword) {
            return res.status(401).json({ message: "Password is Wrong" });
        }
        const token = await genToken(EmailExists._id);
        res.cookie("token", token, cookieOptions)
        // res.status(200).json(newCustomer)
        const customerData = EmailExists.toObject();
        delete customerData.password;
        return res.status(200).json({ message: "Login successful", customer: customerData })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" }, error)
    }
}
export const getCustomer = async (req, res) => {
    const getCustomer = req.customer.toObject();
    delete getCustomer.password;
    return res.status(200).json(getCustomer);
}

export const Logout = async (req, res) => {

    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const wishList = async (req, res) => {
    try {
        const productId = req.params.productId;
        const findProductById = await Product.findById(productId)
        if (!findProductById) {
            return res.status(404).json({ message: "Product not found" })
        }
        const alreadyExists = await req.customer.wishlist.some((id) => id.toString() === productId.toString())
        if (alreadyExists) {
            return res.status(409).json({ message: "This item is already added" })
        }
        req.customer.wishlist.push(productId);
        await req.customer.save();
        return res.status(200).json({ message: "Wishlist updated successfully!" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getWishlist = async (req, res) => {
    try {
        const findCustomerById = await Customer.findById(req.customer._id).populate("wishlist");
        if (!findCustomerById) {
            return res.status(404).json({ message: "This customerId doesnot exists" })
        }
        return res.status(200).json({
            success: true,
            count: req.customer.wishlist.length,
            wishlist: findCustomerById.wishlist,
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        // const deleteProductById = await Customer.findByIdAndDelete(id);
        const exists = req.customer.wishlist.some((id) => id.toString() === productId.toString())

        if (!exists) {
            return res.status(404).json({ message: "This id is not found" })
        }
        await req.customer.wishlist.pull(productId);
        await req.customer.save()

        return res.status(200).json({ message: "Product deleted succesfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const addToCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).json({ message: "This productId doesnot exists" });
        }
        const findProduct = await Product.findById(productId);
        if (!findProduct) {
            return res.status(404).json({ message: "This product does not exists" })
        }
        const alreadyExists = req.customer.cart.find((id) => id.product.toString() === productId.toString());
        if (alreadyExists) {
            if (alreadyExists.quantity >= findProduct.stock) {
                return res.status(400).json({ message: "Insuffient stock" })
            }
            alreadyExists.quantity++;
        }
        else if (findProduct.stock < 1) {
            return res.status(400).json({ message: "Insuffient stock" })
        }
        else req.customer.cart.push({
            product: productId,
            quantity: 1,
        });
        await req.customer.save()
        return res.status(200).json({ message: "Product added to cart successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getCartOfCustomer = async (req, res) => {
    try {
        // console.log("GET CART CONTROLLER HIT");
        const customer = await Customer.findById(req.customer._id).populate("cart.product")
        if (!customer) {
            return res.status(404).json({ message: "This customer does not exist" })
        }
        return res.status(200).json(customer.cart)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const updateCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params
        if (!productId) {
            return res.status(400).json({ message: "This product does not exists" })
        }
        const { quantity } = req.body
        const prod = await Product.findById(productId)
        if (!prod) {
            return res.status(400).json({ message: "This product does not exists" })
        }
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be an integer greater than or equal to 1" })
        }
        if (quantity > prod.stock) {
            return res.status(400).json({ message: "Insufficient stock" })
        }
        const findProduct = await req.customer.cart.find((item) => item.product.toString() === productId.toString());
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        findProduct.quantity = quantity
        await req.customer.save()
        return res.status(200).json("Cart quantity updated successfully")
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const deleteProductFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const filteredCart = req.customer.cart.filter((id) => id.product.toString() !== productId.toString())
        req.customer.cart=filteredCart
        await req.customer.save()
        return res.status(200).json({message:"Cart updated successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
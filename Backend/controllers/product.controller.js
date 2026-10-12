import Product from "../models/Product.model.js";
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image } = req.body
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            image
        })
        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(400).json({ error: "Failed to load projects" })
    }
}
export const getAllProducts = async (req, res) => {
    try {
        const { search, category } = req.query
        const query = {};
        if (search) {
            query.name = {
                $regex: search,
                $options: "i",
            }
        }
        if (category) {
            query.category = category
        }
        const products = await Product.find(query)
        return res.status(200).json({ success: true, count: products.length, products: products })

    }
    // } catch (error) {
    //     return res.status(400).json({ error: "Unable to find products" })
    // }
    //     catch (error) {
    //     console.log(error)
    //     return res.status(400).json({ error: "Unable to find products" })
    // }

    catch (error) {
        console.error("getAllProducts error:", error);
        return res.status(400).json({
            error: "Unable to find products",
            details: error.message
        });
    }

}
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Invalid ID" })
        const findProduct = await Product.findById(id)
        if (findProduct === null) return res.status(404).json({ message: "Product doesnt exists" })
        return res.status(200).json(findProduct)
    } catch (error) {
        return res.status(400).json({ error: "Unable to find product" })
    }
}

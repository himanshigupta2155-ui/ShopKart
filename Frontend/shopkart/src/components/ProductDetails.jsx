import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axiosInstance from './axiosCalls/axios'
import { useDispatch } from 'react-redux'
// import {addToCart} from'./redux/cartSlice'
import { addToCart } from "../redux/cartSlice";
function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`products/getOne/${id}`)
                setProduct(res.data);
            }
            catch (error) {
                setError("Unable to load product");
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])
    // return (
    //     <div>
    //         {loading ? (
    //             <p>Loading Product...</p>
    //         ) : error ? (
    //             <p>{error}</p>
    //         ) : (
    //             <div>
    //                 <img src={product.image} alt={product.name} />

    //                 <h1>{product.name}</h1>

    //                 <p>{product.description}</p>

    //                 <p>Price: ₹{product.price}</p>

    //                 <p>Category: {product.category}</p>

    //                 <p>
    //                     {product.stock > 0
    //                         ? `In Stock (${product.stock})`
    //                         : "Out of Stock"}
    //                 </p>

    //                 <button>Add to Cart</button>
    //             </div>
    //         )
    //         }
    //     </div>
    // )
    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">

            <div className="mx-auto max-w-6xl">
                <button
                    onClick={() => navigate("/products")}
                    className="mb-6 rounded-xl bg-white px-5 py-2.5 font-medium text-orange-600 shadow-sm transition hover:bg-orange-100"
                >
                    ← Back to Products
                </button>
                {loading ? (

                    <div className="py-20 text-center">
                        <p className="text-orange-500">
                            Loading product...
                        </p>
                    </div>

                ) : error ? (

                    <div className="py-20 text-center">
                        <p className="text-red-500">
                            {error}
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-10 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">

                        {/* Product Image */}

                        <div className="flex items-center justify-center rounded-2xl bg-orange-50 p-8">

                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-[400px] w-full object-contain"
                            />

                        </div>


                        {/* Product Information */}

                        <div className="flex flex-col justify-center">

                            {/* Category */}

                            <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                                {product.category}
                            </span>


                            {/* Name */}

                            <h1 className="mt-5 text-4xl font-bold text-stone-800">
                                {product.name}
                            </h1>


                            {/* Description */}

                            <p className="mt-5 leading-7 text-stone-600">
                                {product.description}
                            </p>


                            {/* Price */}

                            <p className="mt-6 text-3xl font-bold text-orange-600">
                                ₹{product.price}
                            </p>


                            {/* Stock */}

                            <p
                                className={`mt-4 text-sm font-medium ${product.stock > 0
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {product.stock > 0
                                    ? `In Stock (${product.stock})`
                                    : "Out of Stock"}
                            </p>


                            {/* Add to Cart */}

                            <button
                                onClick={async () => {
                                    try {
                                        await axiosInstance.post(`/customers/cart/${product._id}`)
                                        dispatch(addToCart(product))
                                    } catch (error) {
                                        console.log(error.response?.data)
                                    }
                                }}

                                disabled={product.stock === 0}
                                className="mt-8 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                Add to Cart
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    )
}

export default ProductDetails
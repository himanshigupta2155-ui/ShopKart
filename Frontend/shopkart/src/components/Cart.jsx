import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCart, removeFromCart } from '../redux/cartSlice';
import axiosInstance from './axiosCalls/axios';

function Cart() {
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const cart = useSelector((state) => state.cart)
    console.log(cart);
    const total = cart.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)
    if (cart.length === 0) {
        return <p>Your cart is empty</p>
    }
    return (
        //         <div>
        //             {error && <p>{error}</p>}
        //             {cart.map((item) => (
        //                 <div key={item.product._id}>
        //                     <p>{item.product.name}</p>
        //                     <button disabled={loading} onClick={async () => {
        //                         try {
        //                             setLoading(true)
        //                             if (item.quantity > 1) {
        //                                 await axiosInstance.patch(`/customers/update/${item.product._id}`, { quantity: item.quantity - 1 })

        //                                 dispatch(updateCart({
        //                                     productId: item.product._id,
        //                                     quantity: item.quantity - 1
        //                                 }))
        //                                 setError("")
        //                             } else {
        //                                 await axiosInstance.delete(`/customers/cart/${item.product._id}`)
        //                                 dispatch(removeFromCart({
        //                                     productId: item.product._id,
        //                                 }))
        //                                 setError("");
        //                             }
        //                         } catch (error) {
        //                             setError(error.response?.data?.message || "Something went wrong")
        //                         } finally { setLoading(false) }

        //                     }}>-</button>
        //                     <p>Quantity: {item.quantity}</p>
        //                     {/* <button onClick={()=>axiosInstance.patch(`/customers/update/${item.product._id}`,{quantity:item.quantity+1},dispatch(updateCart({
        //                     productId:item.product._id,
        //                     quantity:item.quantity
        //                 })))}>+</button> */}

        //                     <button disabled={loading} onClick={async () => {

        //                         try {
        //                             setLoading(true)
        //                             await axiosInstance.patch(`/customers/update/${item.product._id}`, { quantity: item.quantity + 1 })
        //                             dispatch(updateCart({
        //                                 productId: item.product._id,
        //                                 quantity: item.quantity + 1
        //                             }))
        //                             setError("")
        //                         } catch (error) {
        //                             setError(error.response?.data?.message || "Something went wrong")
        //                         } finally {
        //                             setLoading(false)
        //                         }

        //                     }}>+</button>
        //                     <button disabled={loading} onClick={async()=>{
        //                         try {
        //                             setLoading(true)
        //                             await axiosInstance.delete(`/customers/cart/${item.product._id}`)
        //                             dispatch(removeFromCart({
        //                                 productId:item.product._id
        //                             }))
        //                             setError("")
        //                         } catch (error) {
        //                              setError(error.response?.data?.message || "Something went wrong")
        //                         }
        //                         finally{
        //                             setLoading(false)
        //                         }
        //                     }} className="border border-orange-500 text-orange-600 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        // >
        //                         Remove
        //                         </button>
        //                     <p>Price: ₹{item.product.price}</p>
        //                     <p>Subtotal: ₹{item.quantity * item.product.price}</p>


        //                 </div>
        //             ))}
        //             <p>Total: ₹{total}</p>
        //         </div>
        <div className="min-h-screen bg-orange-50/60 px-4 sm:px-8 py-10">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Your Cart <span className="text-orange-500"></span>
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Review your items and proceed to checkout.
                    </p>
                </div>

                {error && (
                    <p className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 p-4">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">

                    {/* Cart items */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-orange-100 shadow-sm px-5 sm:px-7">

                        {cart.map((item) => (
                            // <div
                            //     key={item.product._id}
                            //     className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-orange-100 last:border-b-0"
                            // >
                            <div
                                key={item.product._id}
                                className="mb-5 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
                            >
                                {/* Product details */}
                                <div className="flex-1">
                                    {/* <p className="text-lg font-semibold text-slate-900">
                                        {item.product.name}
                                    </p> */}
                                    <p className="mb-3 text-lg font-semibold text-gray-800">
                                        {item.product.name}
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {item.product.category}
                                    </p>

                                    <p className="text-lg font-bold text-orange-600 mt-3">
                                        ₹{item.product.price}
                                    </p>
                                </div>

                                {/* Quantity and remove controls */}
                                <div className="flex flex-wrap items-center gap-4">

                                    <div className="flex items-center border border-orange-200 rounded-xl overflow-hidden">
                                        <button
                                            className="rounded-lg bg-orange-100 px-4 py-2 font-semibold text-orange-700 hover:bg-orange-200 disabled:opacity-50"

                                            disabled={loading}
                                            onClick={async () => {
                                                try {
                                                    setLoading(true)

                                                    if (item.quantity > 1) {
                                                        await axiosInstance.patch(
                                                            `/customers/update/${item.product._id}`,
                                                            { quantity: item.quantity - 1 }
                                                        )

                                                        dispatch(updateCart({
                                                            productId: item.product._id,
                                                            quantity: item.quantity - 1
                                                        }))
                                                    } else {
                                                        await axiosInstance.delete(
                                                            `/customers/cart/${item.product._id}`
                                                        )

                                                        dispatch(removeFromCart({
                                                            productId: item.product._id
                                                        }))
                                                    }

                                                    setError("")
                                                } catch (error) {
                                                    setError(
                                                        error.response?.data?.message ||
                                                        "Something went wrong"
                                                    )
                                                } finally {
                                                    setLoading(false)
                                                }
                                            }}
                                            className="w-10 h-10 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xl font-semibold disabled:opacity-50"
                                        >
                                            −
                                        </button>

                                        <span className="w-12 text-center font-semibold text-slate-800">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                                            disabled={loading}
                                            onClick={async () => {
                                                try {
                                                    setLoading(true)

                                                    await axiosInstance.patch(
                                                        `/customers/update/${item.product._id}`,
                                                        { quantity: item.quantity + 1 }
                                                    )

                                                    dispatch(updateCart({
                                                        productId: item.product._id,
                                                        quantity: item.quantity + 1
                                                    }))

                                                    setError("")
                                                } catch (error) {
                                                    setError(
                                                        error.response?.data?.message ||
                                                        "Something went wrong"
                                                    )
                                                } finally {
                                                    setLoading(false)
                                                }
                                            }}
                                            className="w-10 h-10 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xl font-semibold disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="font-bold text-slate-900">
                                        ₹{item.product.price * item.quantity}
                                    </p>

                                    <button
                                        disabled={loading}
                                        onClick={async () => {
                                            try {
                                                setLoading(true)

                                                await axiosInstance.delete(
                                                    `/customers/cart/${item.product._id}`
                                                )

                                                dispatch(removeFromCart({
                                                    productId: item.product._id
                                                }))

                                                setError("")
                                            } catch (error) {
                                                setError(
                                                    error.response?.data?.message ||
                                                    "Something went wrong"
                                                )
                                            } finally {
                                                setLoading(false)
                                            }
                                        }}
                                        className="border border-orange-300 text-orange-600 bg-white hover:bg-orange-50 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order summary */}
                    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
                        <div className="bg-orange-500 px-6 py-5">
                            <h2 className="text-xl font-bold text-white">
                                Order Summary
                            </h2>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between gap-4 text-slate-600 mb-5">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-900">
                                    ₹{total}
                                </span>
                            </div>

                            <div className="flex justify-between gap-4 text-slate-600 mb-5">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">
                                    Free
                                </span>
                            </div>

                            <div className="border-t border-orange-100 pt-5 flex justify-between items-center gap-3">
                                <span className="text-lg font-bold text-slate-900">
                                    Total
                                </span>
                                <span className="text-2xl font-bold text-orange-600">
                                    ₹{total}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart
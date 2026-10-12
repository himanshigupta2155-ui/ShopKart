import React from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from './axiosCalls/axios';
import { useState, useEffect } from 'react';

function OrderDetails() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const getOrder = async () => {
            try {
                setLoading(true);

                const response = await axiosInstance.get(`/orders/${params.id}`)
                setOrder(response.data.findOrderById);
            }
            catch (error) {
                console.log("Unable to load orders")
                setError(error.response?.data?.message || "Unable to load orders");
            } finally {
                setLoading(false);
            }
        }
        getOrder();
    }, [params.id]);
    if (loading) {
        // return(
        //     <p>Loading order Details...</p>
        // )
        return (
            <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
                <p className="rounded-2xl bg-white px-8 py-6 text-lg font-semibold text-orange-700 shadow-sm">
                    Loading order Details...
                </p>
            </div>
        )
    }
    if (error) {
        // return(
        //     <p>{error}</p>
        // )
        return (
            <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
                <p className="rounded-2xl border border-red-100 bg-white px-8 py-6 font-medium text-red-600 shadow-sm">
                    {error}
                </p>
            </div>
        )
    }
    if (!order) {
        // return(
        //     <p>Order not found</p>
        // )
        return (
            <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
                    <div className="mb-4 text-5xl">📦</div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Order Not Found
                    </h2>
                    <p className="mt-3 text-gray-600">
                        We couldn't find the details for this order.
                    </p>
                </div>
            </div>
        )
    }
    // return (
    //     <div>
    //         <h1>OrderDetails</h1>
    //         <p>{order._id}</p>
    //         <p>{order.totalAmount}</p>
    //         <p>{order.paymentStatus}</p>
    //         <p>{order.status}</p>

    //         {order.items.map((item)=>(
    //              <div key={item._id}>
    //             <p>{item.name}</p>
    //             <p>{item.price}</p>
    //             <p>{item.quantity}</p>
    //              </div>
    //         ))}

    //         </div>
    // )
    return (
        <div className="min-h-screen bg-orange-50 px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-4xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-orange-900 sm:text-4xl">
                        Order Details
                    </h1>
                    <p className="mt-2 text-orange-700">
                        View your purchase information and order items.
                    </p>
                </div>

                <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm sm:p-8">

                    <div className="mb-6 border-b border-orange-100 pb-5">
                        <p className="text-sm font-medium text-gray-500">
                            Order ID
                        </p>
                        <p className="mt-1 break-all font-semibold text-gray-800">
                            {order._id}
                        </p>
                    </div>

                    <div className="mb-6 rounded-xl bg-orange-50 p-5">
                        <p className="text-sm text-orange-700">
                            Total Amount
                        </p>
                        <h2 className="mt-1 text-3xl font-bold text-orange-600">
                            ₹{order.totalAmount}
                        </h2>
                    </div>

                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-orange-100 p-4">
                            <p className="text-sm text-orange-700">
                                Payment Status
                            </p>
                            <p className="mt-1 font-bold text-orange-900">
                                {order.paymentStatus}
                            </p>
                        </div>

                        <div className="rounded-xl bg-amber-100 p-4">
                            <p className="text-sm text-amber-700">
                                Order Status
                            </p>
                            <p className="mt-1 font-bold text-amber-900">
                                {order.status}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-xl font-bold text-gray-800">
                            Items Ordered
                        </h2>

                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col justify-between gap-3 rounded-xl border border-orange-100 bg-orange-50/70 p-4 sm:flex-row sm:items-center"
                                >
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {item.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-bold text-orange-700">
                                        ₹{item.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => window.history.back()}
                        className="mt-8 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
                    >
                        Back
                    </button>

                </div>
            </div>
        </div>
    )

}

export default OrderDetails
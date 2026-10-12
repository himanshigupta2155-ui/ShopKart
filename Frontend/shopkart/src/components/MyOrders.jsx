import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosCalls/axios'
import { useNavigate } from 'react-router-dom';
function MyOrders() {
    const [error, setError] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const handleOrders = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/orders');
                console.log("Orders API response:", response.data);
                setOrders(response.data.findOrder || []);
            } catch (error) {
                console.log(error.response?.data?.message)
                setError(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
        handleOrders();
    }, [])
    if (loading) {
        // return (
        //     <p>Loading your orders...</p>
        // )
        return (
            <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
                <p className="rounded-2xl bg-white px-8 py-6 text-lg font-semibold text-orange-700 shadow-sm">
                    Loading your orders...
                </p>
            </div>
        )
    }
    if (error) {
        // return (
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
    if (orders.length === 0) {
        // return (
        //     <p>You haven't placed any orders yet.</p>
        // )
        return (
            <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
                    <div className="mb-4 text-5xl">📦</div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        No Orders Yet
                    </h2>
                    <p className="mt-3 text-gray-600">
                        You haven't placed any orders yet.
                    </p>
                </div>
            </div>
        )
    }
    //   return (
    //     <div>
    //         <h1>MyOrders</h1>
    //         {orders.map((order)=>(
    //             <div key={order._id}>
    //                 <h1>{order.totalAmount}</h1>
    //                 <h2>{order.paymentStatus}</h2>
    //                 <h2>{order.status}</h2>
    //                 {order.items.map((item)=>(
    //                     <div key={item._id}>
    //                         <p>{item.name}</p>
    //                         <p>{item.quantity}</p>
    //                         <p>{item.price}</p>
    //                         </div>
    //                 ))}
    //             </div>
    //         ))}
    //         </div>
    //   )

    return (
        <div className="min-h-screen bg-orange-50 px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-orange-900 sm:text-4xl">
                        My Orders
                    </h1>
                    <p className="mt-2 text-orange-700">
                        Track your purchases and view your order details.
                    </p>
                </div>

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="mb-6 rounded-2xl border border-orange-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-7"
                    >
                        <div className="flex flex-col justify-between gap-4 border-b border-orange-100 pb-5 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Order ID
                                </p>
                                <p className="mt-1 break-all font-semibold text-gray-800">
                                    {order._id}
                                </p>
                            </div>

                            <div className="sm:text-right">
                                <p className="text-sm text-gray-500">
                                    Total Amount
                                </p>
                                <h2 className="mt-1 text-2xl font-bold text-orange-600">
                                    ₹{order.totalAmount}
                                </h2>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <div className="rounded-lg bg-orange-100 px-4 py-2">
                                <p className="text-xs text-orange-700">
                                    Payment Status
                                </p>
                                <p className="font-semibold text-orange-900">
                                    {order.paymentStatus}
                                </p>
                            </div>

                            <div className="rounded-lg bg-amber-100 px-4 py-2">
                                <p className="text-xs text-amber-700">
                                    Order Status
                                </p>
                                <p className="font-semibold text-amber-900">
                                    {order.status}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                                Items Ordered
                            </h3>

                            <div className="space-y-3">
                                {order.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex flex-col justify-between gap-2 rounded-xl border border-orange-100 bg-orange-50/70 p-4 sm:flex-row sm:items-center"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-bold text-orange-700">
                                            ₹{item.price}
                                        </p>
                                        {/* <button onClick={()=>navigate(`/orders/${order._id}`)}>View Orders</button> */}

                                        <button
                                            onClick={() => navigate(`/orders/${order._id}`)}
                                            className="mt-6 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white shadow-sm transition duration-200 hover:bg-orange-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                                        >
                                            View Details
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )

}

export default MyOrders
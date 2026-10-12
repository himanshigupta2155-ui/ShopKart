import React from 'react'
import { useState } from 'react'
import axiosInstance from './axiosCalls/axios'
import{useSelector,useDispatch} from 'react-redux'
import { clearCart } from '../redux/cartSlice'
import {useNavigate} from 'react-router-dom'
function Checkout() {
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: "",

    })
   
    const cart = useSelector((state)=>state.cart)
    console.log("Checkout cart:", cart);
    const total = cart.reduce((acc,item)=>{
        return acc+item.quantity*item.product.price;
    },0)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
         e.preventDefault();
         const empty =  Object.values(shippingAddress).some((add)=>{
        return add.trim()==="";
    })
    if(empty){
        alert("All fiels are required!")
        return;
    }
         try {
            const response = await axiosInstance.post('/orders/create-payment-order',{shippingAddress})
            // console.log(response.data)
            const data = response.data;
            const options={
                key:data.key,
                amount:data.amount,
                currency:data.currency,
                order_id:data.razorpayOrderId,
                name:"ShopKart",
                description:"Order Payment",
                handler:async function(response){
                    console.log(response);
                    try{
                    const verifyResponse = await axiosInstance.post('/orders/verify-payments',{
                        razorpay_order_id:response.razorpay_order_id,
                        razorpay_payment_id:response.razorpay_payment_id,
                        razorpay_signature:response.razorpay_signature
                    })
                    // console.log(verifyResponse.data);
                    if(verifyResponse.status===200){
                        dispatch(clearCart());
                        navigate('/order-confirmation')
                    }
                }catch(error){
                    alert(error.response?.data?.message || "Payment verification failed.please contact support")
                }
                }
            }
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
         } catch (error) {
            console.log(error.response?.data?.message)
         }
    }
    // return (
       
    //     <div>
    //         <h2>Checkout</h2>
    //     <form onSubmit={handleSubmit}>
    //         <label>Full Name</label>
    //         <input
    //         type="text"
    //         value={shippingAddress.fullName}
    //         onChange={(e)=>setShippingAddress({...shippingAddress,fullName:e.target.value})}
    //         />
    //         <label>Phone</label>
    //         <input
    //         type="tel"
    //         value={shippingAddress.phone}
    //         onChange={(e)=>{setShippingAddress({...shippingAddress,phone:e.target.value})}}
    //         />
    //         <label>City</label>
    //         <input
    //         type="text"
    //         value={shippingAddress.city}
    //         onChange={(e)=>{setShippingAddress({...shippingAddress,city:e.target.value})}}
    //         />
    //         <label>State</label>
    //         <input
    //         type="text"
    //         value={shippingAddress.state}
    //         onChange={(e)=>{setShippingAddress({...shippingAddress,state:e.target.value})}}
    //         />
    //         <label>Address</label>
    //         <input
    //         type="text"
    //         value={shippingAddress.addressLine1}
    //         onChange={(e)=>{setShippingAddress({...shippingAddress,addressLine1:e.target.value})}}
    //         />
    //         <label>Pincode</label>
    //         <input
    //         type="text"
    //         value={shippingAddress.pincode}
    //         onChange={(e)=>{setShippingAddress({...shippingAddress,pincode:e.target.value})}}
    //         />
    //         <button type="submit">Continue to payment</button>
    //     </form>
    //     </div>
    // )
   
return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">

            {/* Page Heading */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Checkout<span className="text-orange-500">.</span>
                </h2>
                <p className="mt-2 text-gray-600">
                    Complete your shipping details to continue with your order🛍️
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Shipping Form */}
                <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <h3 className="text-xl font-bold text-gray-800">
                            Shipping Address
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the address where you want your order delivered.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={shippingAddress.fullName}
                                onChange={(e)=>setShippingAddress({...shippingAddress,fullName:e.target.value})}
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Phone
                            </label>
                            <input
                                type="tel"
                                required
                                value={shippingAddress.phone}
                                pattern="[6-9][0-9]{9}"
                                onChange={(e)=>{setShippingAddress({...shippingAddress,phone:e.target.value})}}
                                placeholder="Enter your phone number"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                required
                                value={shippingAddress.addressLine1}
                                onChange={(e)=>{setShippingAddress({...shippingAddress,addressLine1:e.target.value})}}
                                placeholder="House number, street, area"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>

                        {/* City and State */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingAddress.city}
                                    onChange={(e)=>{setShippingAddress({...shippingAddress,city:e.target.value})}}
                                    placeholder="Enter city"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    State
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingAddress.state}
                                    onChange={(e)=>{setShippingAddress({...shippingAddress,state:e.target.value})}}
                                    placeholder="Enter state"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />
                            </div>
                        </div>

                        {/* Pincode */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Pincode
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                pattern="[0-9]{6}"
                                value={shippingAddress.pincode}
                                onChange={(e)=>{setShippingAddress({...shippingAddress,pincode:e.target.value})}}
                                placeholder="Enter your 6-digit pincode"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-orange-500 px-6 py-4 font-bold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        >
                            Continue to Payment
                            <span className="ml-2">→</span>
                        </button>

                    </form>
                </div>

                {/* Order Summary Placeholder */}
                <div className="h-fit rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                    {/* <h3 className="text-xl font-bold text-gray-800"> */}
                    <h3 className="text-xl font-extrabold text-gray-900">
                        Order Summary
                    </h3>

                    <div className="mt-5 rounded-xl bg-orange-50 p-4">
                        <p className="font-semibold text-orange-700">
                            Almost there!
                        </p>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Review your items in the cart before continuing to payment.
                        </p>
                    </div>

                    <div className="mt-5 border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-500">
                            Secure payment powered by Razorpay.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
)

}

export default Checkout
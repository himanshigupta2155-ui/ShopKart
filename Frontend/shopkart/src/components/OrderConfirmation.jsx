// import React from 'react'

// function OrderConfirmation() {
//   return (
//     <div>OrderConfirmation</div>
//   )
// }

// export default OrderConfirmation

import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderConfirmation() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">🎉</div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-600 mt-4">
                    Thank you for shopping with ShopKart.
                    Your payment has been verified successfully.
                </p>

                <button
                    onClick={() => navigate('/products')}
                    className="mt-8 w-full rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default OrderConfirmation;

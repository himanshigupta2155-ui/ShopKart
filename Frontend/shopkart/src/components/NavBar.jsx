import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import axiosInstance from './axiosCalls/axios'
import { useSelector } from 'react-redux'
function NavBar() {
    const navigate = useNavigate()
    const { customer, setCustomer } = useContext(AuthContext)
    const cart = useSelector((state) => state.cart)
    const totalItems = cart.reduce((acc, currentItems) => {
        return acc + currentItems.quantity
    }, 0)
    // return (
    // <>
    //     {customer && (
    //         <div>NavBar

    //             <button onClick={() => navigate('/wishlist')}>My Wishlist</button>
    //             <button onClick={() => navigate('/home')

    //             }>Home</button>
    //             <button onClick={() => axiosInstance.post('/customers/logout').then(()=>{setCustomer(null); navigate('/login')})
    //             }>
    //                 Logout
    //             </button>
    //             <button onClick={() => navigate('/products')
    //             }>
    //                 Products
    //             </button>

    //         </div>
    //     )
    //     }
    // </>

    // )
    console.log(cart)
    console.log(totalItems)
    return (
        <>
            {customer && (
                <nav className="sticky top-0 z-50 flex w-full items-center justify-between gap-6 border-b border-orange-100 bg-white px-6 py-4 shadow-sm md:px-10 lg:px-16">
                    {/* Logo */}
                    <div
                        className="flex cursor-pointer items-center gap-2 text-2xl font-extrabold tracking-tight text-stone-800"
                        onClick={() => navigate("/home")}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl text-white shadow-sm">
                            🛍️
                        </div>
                        <span>
                            Shop<span className="text-orange-500">Kart</span>
                        </span>
                    </div>

                    {/* Navigation links */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        <button
                            onClick={() => navigate("/home")}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate("/products")}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                            Products
                        </button>

                        <button
                            onClick={() => navigate("/wishlist")}
                            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                            ♡ My Wishlist
                        </button>
                        {/* <p>{totalItems}</p> */}
                        <button
                            onClick={() => navigate("/cart")}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-orange-50 hover:text-orange-600"
                        >
                            Cart ({totalItems})
                        </button>
                    </div>

                    {/* Customer actions */}
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm font-medium text-stone-700 lg:block">
                            Hi, {customer.fullName?.split(" ")[0] || "Customer"}
                        </span>

                        <button
                            onClick={async () => {
                                try {
                                    await axiosInstance.post("/customers/logout");
                                    setCustomer(null);
                                    navigate("/login");
                                } catch (error) {
                                    console.log("Logout failed:", error);
                                }
                            }}
                            className="rounded-lg bg-stone-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}
export default NavBar
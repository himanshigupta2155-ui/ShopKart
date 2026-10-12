import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from './axiosCalls/axios'
import { useNavigate } from 'react-router-dom'


function Wishlist() {
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    useEffect(() => {

        setLoading(true)
        const fetchWishlist = async () => {
            try {
                const res = await axiosInstance.get('/customers/wishlist')
                setWishlist(res.data.wishlist)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchWishlist()

    }, [])

    async function removeFromWishlist(productId) {
        try {
            const product = await axiosInstance.delete(`/customers/wishlist/${productId}`)
            setWishlist((prev) => prev.filter((w) => w._id != productId))
        } catch (error) {
            console.log(error)
        }
    }
    // return (
    //     <div>
    //         <h1>My Wishlist</h1>
    //         {loading ? <p>Loading...</p> :
    //             error?<p>{error}</p>:
    //             wishlist.length === 0 ? <p>Your wishlist is empty. Add  the products you love💕 </p>
    //                 : wishlist.map((w) => (
    //                     <div key={w._id}>{w.name}
    //                         <img src={w.image} alt={w.name} />
    //                         <p>{w.price}</p>
    //                         <p>{w.category}</p>
    //                         <p>{w.stock}</p>
    //                         <button onClick={() => navigate(`/products/${w._id}`)}>View Details</button>
    //                         <button onClick={() => removeFromWishlist(w._id)}>Remove Product</button>
    //                     </div>
    //                 ))
    //         }


    //     </div>
    // )
    // ```jsx
return (
    <div className="min-h-screen bg-orange-50/40 px-5 py-10 text-gray-800 sm:px-8">
        <div className="mx-auto max-w-7xl">

            <div className="mb-10">
                <p className="font-semibold uppercase tracking-wider text-orange-600">
                    Saved with love ♥
                </p>
                <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                    My Wishlist
                </h1>
                <p className="mt-3 text-gray-500">
                    All the things you love, collected in one place.
                </p>
            </div>

            {loading ? (
                <div className="rounded-2xl bg-white py-16 text-center text-gray-500 shadow-sm">
                    Loading your wishlist...
                </div>
            ) : error ? (
                <div className="rounded-2xl bg-white py-16 text-center text-red-500 shadow-sm">
                    {error}
                </div>
            ) : wishlist.length === 0 ? (
                <div className="rounded-3xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm">
                    <div className="text-7xl">💝</div>
                    <h2 className="mt-5 text-2xl font-bold">
                        Your wishlist is waiting!
                    </h2>
                    <p className="mt-3 text-gray-500">
                        Add the products you love and keep them all in one place.
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-7 rounded-xl bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-700"
                    >
                        Explore Products →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {wishlist.map((w) => (
                        <div
                            key={w._id}
                            className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex h-56 items-center justify-center bg-orange-50 p-5">
                                <img
                                    src={w.image}
                                    alt={w.name}
                                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                                    {w.category}
                                </p>

                                <h2 className="mt-2 truncate text-lg font-bold">
                                    {w.name}
                                </h2>

                                <p className="mt-3 text-2xl font-extrabold">
                                    ₹{w.price}
                                </p>

                                <p className={`mt-2 text-sm font-medium ${
                                    w.stock > 0 ? 'text-green-600' : 'text-red-500'
                                }`}>
                                    {w.stock > 0 ? '✓ In stock' : 'Out of stock'}
                                </p>

                                <button
                                    onClick={() => navigate(`/products/${w._id}`)}
                                    className="mt-4 w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
                                >
                                    View Details →
                                </button>

                                <button
                                    onClick={() => removeFromWishlist(w._id)}
                                    className="mt-3 w-full rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-500 transition hover:border-red-400 hover:bg-red-50"
                                >
                                    ♥ Remove Product
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    </div>
)
// ```
}

export default Wishlist
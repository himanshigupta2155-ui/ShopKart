import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from './axiosCalls/axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchProducts = async () => {
                setLoading(true)
                setError("")
                try {
                    const res = await axiosInstance.get('/products/getAll', {
                        params: {
                            search: search,
                            category: category
                        }

                    });
                    setProducts(res.data.products)


                } catch (error) {
                    setError("Unable to load products")
                }
                finally {
                    setLoading(false)


                }
            }

            fetchProducts();
        }, 500);
        // console.log(products)
        return () => clearTimeout(timer)



    }, [search, category])

    useEffect(()=>{
        const fetchWishlist= async()=>{
           const res = await axiosInstance.get('/customers/wishlist')
           const ids = res.data.wishlist.map((product)=>product._id)
           setWishlist(ids)
        }
        fetchWishlist()
        
    },[])


    const addToWishlist = async (productId) => {
        try {
            const wishlistItems = await axiosInstance.post(`/customers/wishlist/${productId}`)
            // console.log(wishlistItems)
            setWishlist(prev => [...prev, productId])
        } catch (error) {
            console.log(error)
        }

    }
    // return (
    //     <div>
    //         <input
    //             type="text"
    //             placeholder="Search products"
    //             value={search}
    //             onChange={(e) => setSearch(e.target.value)}
    //         />
    //         <select
    //             value={category}
    //             onChange={(e) => setCategory(e.target.value)}
    //         >
    //             <option value="">All Categories</option>
    //             <option value="Electronics">Electronics</option>
    //             <option value="Fashion">Fashion</option>
    //             <option value="Books">Books</option>
    //             <option value="Home">Home</option>
    //         </select>
    //         {/* <p>{search}</p> */}
    //         {loading ? (
    //             <p>Loading Products</p>
    //         ) :
    //             error ? (<p>{error}</p>)
    //                 :
    //                 products.length === 0 ? <p>No products found</p> :
    //                     (

    //                         products.map((p) => (

    //                             <div key={p._id}>

    //                                 <img src={p.image} alt={p.name} />
    //                                 <h2>{p.name}</h2>
    //                                 <p>{p.price}</p>
    //                                 <p>{p.category}</p>
    //                                 <p>{p.stock > 0 ? "In Stock" : "Out of Stock"}</p>

    //                                 <button onClick={()=>navigate(`/products/${p._id}`)}>View Details</button>
    //                             </div>
    //                         ))
    //                     )}
    //     </div>

    // )
    return (
        <div className="min-h-screen bg-orange-50 px-6 py-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-orange-600">
                        ShopKart 🛍️
                    </h1>

                    <p className="mt-2 text-stone-600">
                        Discover products you'll love
                    </p>
                </div>

                {/* Search + Filter */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md rounded-xl border border-orange-200 bg-white px-4 py-3 text-stone-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-xl border border-orange-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-orange-400"
                    >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Books">Books</option>
                        <option value="Home">Home</option>
                    </select>

                </div>

                {/* Products */}

                {loading ? (

                    <div className="py-20 text-center">
                        <p className="text-orange-500">
                            Loading products...
                        </p>
                    </div>

                ) : error ? (

                    <div className="py-20 text-center">
                        <p className="text-red-500">
                            {error}
                        </p>
                    </div>

                ) : products.length === 0 ? (

                    <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-stone-800">
                            No products found
                        </h2>

                        <p className="mt-2 text-stone-500">
                            Try searching for something else.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {products.map((p) => (

                            <div
                                key={p._id}
                                className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                            >

                                {/* Image */}
                                <div className="h-56 bg-orange-50">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="h-full w-full object-contain p-4"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-5">

                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
                                        {p.category}
                                    </span>

                                    <h2 className="mt-4 text-lg font-semibold text-stone-800">
                                        {p.name}
                                    </h2>

                                    <p className="mt-3 text-xl font-bold text-orange-600">
                                        ₹{p.price}
                                    </p>

                                    <p
                                        className={`mt-2 text-sm ${p.stock > 0
                                            ? "text-green-600"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {p.stock > 0
                                            ? `In Stock (${p.stock})`
                                            : "Out of Stock"}
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(`/products/${p._id}`)
                                        }
                                        className="mt-4 w-full rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600"
                                    >
                                        View Details
                                    </button>
                                    <button onClick={() => addToWishlist(p._id)}
                                    disabled={wishlist.includes(p._id)}
                                    >
                                        {wishlist.includes(p._id) ? "✓ Added" : "♡ Add to Wishlist"}</button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}

export default Products
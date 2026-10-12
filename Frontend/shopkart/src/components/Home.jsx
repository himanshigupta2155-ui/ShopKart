// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "./axiosCalls/axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get('/products/getAll');
        setProducts(response.data.products);
      }
      catch (error) {
        console.log("Unable to fetch products", error);
      }
      finally {
        setLoading(false);
      }
    }
    getProducts()
  }, [])
  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Living", icon: "🏠" },
    { name: "Accessories", icon: "🎧" },
  ];

  return (
    <div className="min-h-screen bg-orange-50/40 text-gray-800">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-orange-100 p-8 md:grid-cols-2 md:p-14">
          <div>
            <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-600">
              Welcome to ShopKart
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Everything you love♥️,
              <span className="block text-orange-600">
                all in one place.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 md:text-lg">
              Discover amazing products, explore your favorite categories,
              and find something special for every day.
            </p>

            <button
              onClick={() =>
                document.getElementById("categories")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-8 rounded-xl bg-orange-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-700"
            >
              Shop Now →
            </button>

            <p className="mt-5 text-sm text-gray-500">
              Your everyday shopping destination.
            </p>
          </div>

          <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white p-8 md:min-h-80">
            <div className="text-center">
              <div className="text-8xl md:text-9xl">🛍️</div>
              <p className="mt-5 text-xl font-bold">
                Find your next favorite
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Great finds start here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="font-semibold text-orange-600">EXPLORE SHOPKART</p>
          <h2 className="mt-2 text-3xl font-bold">
            Shop by category
          </h2>
          <p className="mt-2 text-gray-500">
            Find what you need, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            // <div
            // key={category.name}
            // className="cursor-pointer rounded-2xl border border-orange-100 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            //  ```jsx
            <button
              key={category.name}
              onClick={() => navigate("/products")}
              className="w-full rounded-2xl border border-orange-100 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >

              {/* > */}
              <div className="text-4xl">{category.icon}</div>
              <h3 className="mt-4 font-semibold">{category.name}</h3>
              {/* </div> */}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Heading */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-semibold text-orange-600">HANDPICKED FOR YOU</p>
            <h2 className="mt-2 text-3xl font-bold">
              Featured products
            </h2>
            <p className="mt-2 text-gray-500">
              Explore our collection and find your next favorite.
            </p>
          </div>
        </div>

        {/* <div className="mt-8 rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center">
          <div className="text-5xl">📦</div>
          <h3 className="mt-4 text-xl font-semibold">
            Your next favorite is waiting
          </h3>
          {/* <p className="mt-2 text-gray-500">
            Connect this section to your existing products API to display
            real ShopKart products here.
          </p> */}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Featured product cards will go here */}
        </div>

        {/* </div> */}

        <div className="mt-8">
          {loading ? (
            <p className="py-10 text-center text-gray-500">
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <div className="text-5xl">📦</div>
              <h3 className="mt-4 text-xl font-semibold">
                No products available yet
              </h3>
              <p className="mt-2 text-gray-500">
                Please check back soon for new arrivals.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-48 items-center justify-center bg-orange-50 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-orange-600">
                      {product.category}
                    </p>

                    <h3 className="mt-2 line-clamp-1 text-lg font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-xl font-bold">
                      ₹{product.price}
                    </p>

                    <p
                      className={`mt-2 text-sm ${product.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {product.stock > 0 ? "In stock" : "Out of stock"}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/products/${product._id}`)
                      }
                      className="mt-4 w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/products")}
              className="rounded-xl border border-orange-600 px-7 py-3 font-semibold text-orange-600 transition hover:bg-orange-600 hover:text-white"
            >
              View All Products →
            </button>
          </div>
        </div>

      </section >
    </div >
  );
}

export default Home;

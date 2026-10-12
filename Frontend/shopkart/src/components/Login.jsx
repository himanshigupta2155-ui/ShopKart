import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./axiosCalls/axios";
import { useState } from "react";
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" })
    const [err, setErr] = useState('')
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const{setCustomer}=useContext(AuthContext)
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('')
        setLoader(true)
        try {
            const response = await axiosInstance.post("/customers/login",form)
            setCustomer(response.data.customer)
            navigate('/home')
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false);
        }
    }
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">

            {/* Main Card */}
            <div className="w-full max-w-6xl min-h-150 border border-orange-300 rounded-2xl overflow-hidden flex shadow-sm">
                {/* LEFT SIDE */}
                <div className="w-1/2 flex items-center justify-center px-16">

                    <div className="w-full max-w-sm">

                        <h1 className="text-5xl font-bold text-gray-900 mb-2">
                            Welcome
                        </h1>
                        <p className="text-sm text-gray-500 mb-9">
                            We're glad to see you back with us🎉
                        </p>

                        {/* Email */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <div className="flex items-center bg-gray-100 rounded-lg px-4">
                                    <span className="text-gray-400 mr-3">
                                        ✉
                                    </span>

                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full bg-transparent py-3 outline-none text-sm"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>

                                <div className="flex items-center bg-gray-100 rounded-lg px-4">
                                    <span className="text-gray-400 mr-3">
                                        🔒
                                    </span>

                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full bg-transparent py-3 outline-none text-sm"
                                    />
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end mb-6">
                                <a
                                    href="#"
                                    className="text-xs text-orange-500 hover:text-orange-600"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                className="w-full bg-gray-900 text-white py-3 rounded-lg
                         text-sm font-semibold tracking-wide
                         hover:bg-orange-500 transition duration-300"
                            >
                                LOGIN
                            </button>
                        </form>
                        {/* Divider */}
                        <div className="flex items-center gap-3 my-7">
                            <div className="h-px bg-gray-200 flex-1"></div>

                            <span className="text-xs text-gray-400">
                                Or continue with
                            </span>

                            <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-3">

                            <button
                                className="flex-1 border border-gray-300 rounded-lg py-2.5
                           text-sm font-medium hover:bg-gray-50 transition"
                            >
                                Google
                            </button>

                            <button
                                className="flex-1 border border-gray-300 rounded-lg py-2.5
                           text-sm font-medium hover:bg-gray-50 transition"
                            >
                                Facebook
                            </button>
                        </div>

                        {/* Register */}
                        <p className="text-center text-sm text-gray-500 mt-7">
                            Don't have an account?{" "}
                            <Link to="SignUp"
                                className="text-orange-500 font-semibold hover:underline"
                            >
                                Register
                            </Link>
                        </p>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-1/2 bg-orange-50 flex items-center justify-center relative overflow-hidden">

                    {/* Decorative circles */}
                    <div className="absolute w-72 h-72 bg-orange-200/40 rounded-full -top-24 -right-24"></div>

                    <div className="absolute w-52 h-52 bg-orange-200/30 rounded-full -bottom-20 -left-20"></div>

                    <div className="relative text-center px-10">

                        <div className="text-7xl mb-8">
                            🛍️
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            ShopKart
                        </h2>

                        <p className="text-gray-600 max-w-sm leading-relaxed">
                            Discover products you'll love.
                            <br />
                            Shop smarter, shop better.
                        </p>

                        <div className="mt-8 flex justify-center gap-3">
                            <span className="px-4 py-2 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                                Fashion
                            </span>

                            <span className="px-4 py-2 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                                Electronics
                            </span>

                            <span className="px-4 py-2 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                                More
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login;
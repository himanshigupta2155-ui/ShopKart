import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./axiosCalls/axios";
const Signup = () => {
    const [form, setForm] = useState({ fullName: "", email: "", password: "", phoneNo: "" })
    const [err, setErr] = useState("")
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        setErr('')
        try {
            await axiosInstance.post("/customers/register", form)
            console.log("Customer registered")
            navigate('/login')
        } catch (error) {
            console.log(error);
    }
}
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-6xl min-h-150 border border-orange-300 rounded-2xl overflow-hidden flex shadow-sm">

                {/* LEFT SIDE */}
                <div className="w-1/2 bg-orange-50 flex items-center justify-center relative overflow-hidden">

                    <div className="absolute w-72 h-72 bg-orange-200/40 rounded-full -top-24 -left-24"></div>

                    <div className="absolute w-52 h-52 bg-orange-200/30 rounded-full -bottom-20 -right-20"></div>

                    <div className="relative text-center px-10">

                        <div className="text-7xl mb-8">
                            🛒
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            ShopKart🛍️
                        </h2>

                        <p className="text-gray-600 max-w-sm leading-relaxed">
                            Create your account and discover
                            <br />
                            amazing products today.
                        </p>

                        <div className="mt-8 flex justify-center gap-3 flex-wrap">
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


                {/* RIGHT SIDE */}
                <div className="w-1/2 flex items-center justify-center px-16 py-10">

                    <div className="w-full max-w-sm">

                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h1>

                        <p className="text-sm text-gray-500 mb-7">
                            Join ShopKart and start shopping
                        </p>


                        {/* Full Name */}
                        <form onSubmit={handleSubmit}>
                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>

                            <div className="flex items-center bg-gray-100 rounded-lg px-4">

                                <span className="text-gray-400 mr-3">
                                    👤
                                </span>
                                
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        onChange={handleChange}
                                        value={form.fullName}
                                        className="w-full bg-transparent py-3 outline-none text-sm"
                                    />

                            </div>

                        </div>


                        {/* Email */}
                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <div className="flex items-center bg-gray-100 rounded-lg px-4">

                                <span className="text-gray-400 mr-3">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    value={form.email}
                                    className="w-full bg-transparent py-3 outline-none text-sm"
                                />

                            </div>

                        </div>


                        {/* Phone Number */}
                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>

                            <div className="flex items-center bg-gray-100 rounded-lg px-4">

                                <span className="text-gray-400 mr-3">
                                    📱
                                </span>

                                <input
                                    type="tel"
                                    name="phoneNo"
                                    placeholder="Enter your phone number"
                                    onChange={handleChange}
                                    value={form.phoneNo}
                                    className="w-full bg-transparent py-3 outline-none text-sm"
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="flex items-center bg-gray-100 rounded-lg px-4">

                                <span className="text-gray-400 mr-3">
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    onChange={handleChange}
                                    value={form.password}
                                    className="w-full bg-transparent py-3 outline-none text-sm"
                                />

                            </div>

                        </div>



                        {/* Signup Button */}
                        <button type="submit"
                            className="w-full bg-gray-900 text-white py-3 rounded-lg
                         text-sm font-semibold tracking-wide
                         hover:bg-orange-500 transition duration-300"

                        >
                            CREATE ACCOUNT
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">

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


                    {/* Login */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}

                        <Link to="/login"
                            className="text-orange-500 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>

    </div >
  );
};

export default Signup
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Landing from "./components/Landing"
import Home from "./components/Home"
import Products from "./components/Products"
import ProductDetails from "./components/ProductDetails"
import Wishlist from "./components/Wishlist"
import NavBar from "./components/NavBar"
import { useDispatch } from "react-redux"
import { setToCart } from "./redux/cartSlice"
import { AuthProvider } from "./context/authContext"
import axiosInstance from "./components/axiosCalls/axios"
import { useEffect } from "react"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import OrderConfirmation from "./components/OrderConfirmation"
import MyOrders from "./components/MyOrders"
import OrderDetails from "./components/OrderDetails"
function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCart = async () => {
            const res = await axiosInstance.get('/customers/cart')
            dispatch(setToCart(res.data))

        }
        getCart()
    }, [dispatch])
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/myOrders" element={<MyOrders />} />
                        <Route path='/orders/:id' element={<OrderDetails/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App

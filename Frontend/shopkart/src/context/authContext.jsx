import { createContext,useState,useEffect } from "react";
import axiosInstance from "../components/axiosCalls/axios";

export const AuthContext = createContext()
function AuthProvider({children}){
    const[customer,setCustomer]=useState(null)
    useEffect(()=>{
        const checkAuth=async()=>{
        const res = await axiosInstance.get('/customers/me')
        setCustomer(res.data)
        }
        checkAuth()
        
    },[])
    return(
        <AuthContext.Provider value={{customer,setCustomer}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthProvider}
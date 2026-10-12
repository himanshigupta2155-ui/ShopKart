import{createSlice} from '@reduxjs/toolkit'
const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const existingProduct = state.find((item)=>item.product._id===action.payload._id)
            if(!existingProduct){
                state.push({
                product:action.payload,
                quantity:1
        })
    }
    else existingProduct.quantity++;
        },
        updateCart:(state,action)=>{
            const {productId,quantity}=action.payload;
            const item=state.find((item)=>item.product._id===productId)
            if(item){
                item.quantity=quantity
            }
        },
        setToCart:(state,action)=>{
            return action.payload
        },
        removeFromCart:(state,action)=>{
            const{productId}=action.payload
            const item = state.filter((item)=>item.product._id!==productId);
            return item;
        },
        clearCart:(state)=>{
            return [];
        }
    }
})
export default cartSlice.reducer
export const { addToCart,setToCart,updateCart,removeFromCart,clearCart } = cartSlice.actions
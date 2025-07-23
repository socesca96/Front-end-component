
import { CREATE_PRODUCT, DELETE_PRODUCT, LOAD_PRODUCTS, UPDATE_PRODUCT } from "./ProductAction";

const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {
    

    if(action.type === LOAD_PRODUCTS) {
        return {
            ...state,
            products: action.payload
        }
    } else if(action.type === CREATE_PRODUCT){
        return {
            ...state,
            products: [...state.products, action.payload]
        }
    } else if(action.type === UPDATE_PRODUCT){
        return {
            ...state,
            products: state.products.map(product => product._id === action.payload._id ? action.payload : product)
        }
    } else if(action.type === DELETE_PRODUCT){
        return {
            ...state,
            products: state.products.filter(product => product._id !== action.payload)
        }
    } else{
        return state
    }
}

export default productReducer
import { combineReducers } from "redux";
import loginReducer from "../../../Components/login/LoginReducer";
import productReducer from "../../../Components/product/ProductReducer";
import pagesReducer from "../../../Components/pages/PagesReducer";


const reducers = combineReducers({
    loginReducer,
    productReducer,
    pages: pagesReducer
})

export default reducers
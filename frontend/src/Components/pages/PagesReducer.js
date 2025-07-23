import { GO_TO_PAGE } from "./PagesAction"

const initialState = {
    currentPage: "home",
}

const pagesReducer = (state = initialState, action) => {
    if(action.type === GO_TO_PAGE) {
        return {
            ...state, 
            currentPage: action.payload,
        }
    } else {
        return state
    }
}

export default pagesReducer
import { LOAD_INFO} from "./UserAction"


const initialState = {
    user: null,
    isOnline: false
}

const userReducer = (state = initialState, action) => {
  if (action.type === LOAD_INFO) {
        return {
            ...state,
            user: action.payload
        }
    } else {
        return state
    }
}

export default userReducer
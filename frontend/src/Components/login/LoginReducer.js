import { LOAD_INFO, LOGIN, LOGOUT } from "./LoginAction"


const initialState = {
    user: undefined,
    token: undefined,
    isOnline: false
}

const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isOnline: true,
        };
    } else if (action.type === LOGOUT) {
        return {
            user: undefined,
            token: undefined,
            isOnline: false,
        };
    } else if (action.type === LOAD_INFO) {
        return {
            ...state,
            user: action.payload
        }
    } else {
        return state
    }
};

export default loginReducer
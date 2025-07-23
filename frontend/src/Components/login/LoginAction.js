export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOAD_INFO = 'LOAD_INFO'


export const doLoginAction = ({user,token}) => {
    return {
        type: 'LOGIN',
        payload: {user, token}
    }
}

export const doLogoutAction = () => ({
    type: 'LOGOUT'
})

export const loadInfoAction = (user) => {
    return {
        type: LOAD_INFO,
        payload: user
    }
}
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export const doLoginAction = ({user,token}) => {
    return {
        type: 'LOGIN',
        payload: {user, token}
    }
}

export const doLogoutAction = () => ({
    type: 'LOGOUT'
})

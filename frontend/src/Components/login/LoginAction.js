export const LOGIN = 'LOGIN'


export const doLoginAction = ({user,token}) => {
    return {
        type: 'LOGIN',
        payload: {user, token}
    }
}


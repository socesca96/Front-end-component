export const LOAD_INFO = 'LOAD_INFO'

export const loadInfoAction = (user) => {
    return {
        type: LOAD_INFO,
        payload: user
    }
}


export const doLoginFetch = async (email, password) => {
    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'content-type': 'Application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const result = await res.json()
    localStorage.setItem("auth-token", result.token)
    return result.user
}

export const registerUser = async (data) => {
    const res = await fetch ('http://localhost:3000/login/register', {
        method: 'POST',
        body: data
    })
    const result = await res.json()
    return result.user
}
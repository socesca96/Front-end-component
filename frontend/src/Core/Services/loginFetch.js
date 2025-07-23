

export const doLoginFetch = async (email, password) => {
    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Error al hacer login");
    }
    
    return {
        user: result.user,
        token: result.token,
        token_refresh: result.token_refresh
    }
}

export const registerUser = async (data) => {
    const res = await fetch ('http://localhost:3000/login/register', {
        method: 'POST',
        body: data
    })
    const result = await res.json()

    if (!res.ok) {
        throw new Error(result.message || "Error al registrar usuario");
    }
    return {
        user: result.user,
        token: result.token,
        token_refresh: result.token_refresh
    }
}
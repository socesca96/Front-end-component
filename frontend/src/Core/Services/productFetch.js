
export const createProductFetch = async (product, token) => {
    const res = await fetch('http://localhost:3000/products/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        },
        body: JSON.stringify(
            product
        )
    })

    const result = await res.json()
    return result.product
}

export const getAllProductsFetch = async () => {
    const res = await fetch('http://localhost:3000/products/', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })

    const result = await res.json()
    console.log("Respuesta de la API:", result);
    return Array.isArray(result.data) ? result.data : []
}

export const getProductByIdFetch = async (productId) => {
    const res = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
    const result = await res.json()
    return result.product
}

export const deleteProductFetch = async (productId) => {
    const res = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        }
    })

    const result = await res.json()
    return result.message
}

export const updateProductFetch = async (productId, updatedProduct) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        },
        body: JSON.stringify(
            updatedProduct
        )
    })

    const result = await res.json()
    return result.product
}
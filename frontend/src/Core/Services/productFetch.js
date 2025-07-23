
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
    const token = localStorage.getItem("token");
    
    const res = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        }
    });

    if(!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error eliminando producto");
    }

    const result = await res.json()
    return result.message
}

export const updateProductFetch = async (productId, updatedProduct) => {
    const token = localStorage.getItem('token')
    
    const res = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
        body: JSON.stringify(
            updatedProduct
        )
    })
    const contentType = res.headers.get("Content-Type");

    // Si el backend devolvió texto plano como "Token expired"
    if (!res.ok) {
        const errorText = contentType?.includes("application/json")
            ? await res.json()
            : await res.text();

        throw new Error(errorText?.message || errorText || "Error actualizando producto");
    }
    const result = await res.json()
    return result.product
}
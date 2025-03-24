export const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const loadProductsAction = (products) => {
    return {
        type: LOAD_PRODUCTS,
        payload: products
    }
}

export const createProductAction = (product) => {
    return {
        type: CREATE_PRODUCT,
        payload: product
    }
}

export const updateProductAction = (product) => {
    return {
        type: UPDATE_PRODUCT,
        payload: product
    }
}

export const deleteProductAction = (product) => {
    return {
        type: DELETE_PRODUCT,
        payload: product
    }
}
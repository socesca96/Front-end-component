import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { deleteProductFetch, getAllProductsFetch } from '../../Core/Services/productFetch'
import { deleteProductAction, loadProductsAction } from './ProductAction'
import ProductDetail from './ProductDetail'
import productReducer from './ProductReducer';
import { goToPageAction } from '../pages/PagesAction';

const ProductListComponent = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.productReducer.products)

    const [loading, setLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handlerGoToContact = () => {
        dispatch(goToPageAction("contact"))
    }

    const handlerDelete = async (productId) => {
        try {
            await deleteProductFetch(productId)
            dispatch(deleteProductAction(productId))
        } catch (error) {
            console.error("Error eliminando el producto:", error);
        }
    }
    useEffect(() => {
        getAllProductsFetch().then((products) => {
            if (Array.isArray(products)) {
                dispatch(loadProductsAction(products))
            } else {
                console.error("La API no devolvió un array", products);
            }
            setLoading(false)
        })
    }, [])

  return (
    <div className='pages-container'>
       
        {loading ? (
      <div>Loading...</div>
    ) : selectedProduct ? (
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    ) : (
      <div>
         <h1 className='title-page'>Productos</h1>
         <button className='register-button' onClick={() => dispatch(goToPageAction("create-product"))}>Añade un nuevo producto</button>
        {products.map((p, idx) => (
          <div className='products-container' key={idx}>
            <span>{p.name}</span>
            <div className='buttons products'>
              <button className='yellow-button' onClick={() => setSelectedProduct(p)}>Detalles</button>
              <button className='red-button' onClick={() => handlerDelete(p._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    )}

    </div>
  )
}

export default ProductListComponent


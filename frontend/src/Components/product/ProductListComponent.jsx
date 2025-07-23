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
  
  let user = null;
  let isAdmin = false;

  
//Manjear el user desde localStorage
try {
    const storedUser = localStorage.getItem("user");
  if (storedUser) {
      user = JSON.parse(storedUser);
      isAdmin = user?.role === "admin";
    }
    } catch (error) {
      console.error("Error al parsear user:", error);
      localStorage.removeItem("user"); // limpia si está corrupto
    }
  
//Eliminar producto
  const handlerDelete = async (productId) => {
    try {
      await deleteProductFetch(productId)
      dispatch(deleteProductAction(productId))
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  }

  //Obtener productos
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
          onClose={ async(updatedProduct) => {
            if (updatedProduct) {
              setSelectedProduct({...updatedProduct});  
            } else {
              setSelectedProduct(null);
            }
          const updatedProducts = await getAllProductsFetch();
          dispatch(loadProductsAction(updatedProducts))
        }}
        />
      ) : (
        <div className='products-page'>
          <h1 className='title-page'>Productos</h1>
          {isAdmin && (
            <div className="buttons">
              <button className='register-button' onClick={() => dispatch(goToPageAction("create-product"))}>Añade un nuevo producto</button>
            </div>
                )}
                <div className="products-grid">
                   {products.map((p, idx) => (
            <div className='product-card' key={idx}>
              <span className='product-name'>{p.name}</span>
              <div className='buttons products'>
                <button className='yellowb button' onClick={() => setSelectedProduct(p)}>Detalles</button>
                {isAdmin && (
                  <div className="buttons">
                    <button className='redb button' onClick={() => handlerDelete(p._id)}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ))}
                </div>
        </div>
      )}
    </div>
  )
}

export default ProductListComponent


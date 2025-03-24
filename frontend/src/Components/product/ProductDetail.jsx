import React, { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import { useSelector } from "react-redux";

const ProductDetail = (props) => {
  const { product, onClose } = props;

  const [isUpdate, setIsUpdate] = useState(false);
  //Vamos a comprobar si el usuario es admin  
  const user = useSelector(state => state.loginReducer.user);
  const isAdmin = user?.role === "admin";

  return (
    <div>
      {isUpdate ? (
        <UpdateProduct product={product} onClose={() => setIsUpdate(false)} />
      ) : (
        <div className='pages-container product'>
          <h1 className='title-page'>Detalles</h1>
          <div className="product-details">
          <div>
            <span className='title-user'>Nombre: </span>
            <span>{product.name}</span>
          </div>
          <div>
            <span className='title-user'>Descripción: </span>
            <span>{product.description}</span>
          </div>
          <div>
            <span className='title-user'>Código: </span>
            <span>{product.code}</span>
          </div>
          <div>
            <span className='title-user'>Tamaño: </span>
            <span>{product.size}</span>
          </div>
          <div>
            <span className='title-user'>Color: </span>
            <span>{product.colour}</span>
          </div>
          <div>
            <span className='title-user'>Categoría: </span>
            <span>{product.category}</span>
          </div>
          <div>
            <span className='title-user'>Precio: </span>
            <span>{product.price}</span>
          </div>
          </div>
          <div className="buttons">
            {isAdmin && (
              <button className='yellowb button' onClick={() => setIsUpdate(true)}>Editar</button>
            )}
            <button className='greyb button' onClick={onClose}>Volver</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

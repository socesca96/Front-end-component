import React, { useState } from "react";
import UpdateProduct from "./UpdateProduct";

const ProductDetail = (props) => {
  const { product, onClose } = props;

  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div>
      {isUpdate ? (
        <UpdateProduct product={product} onClose={() => setIsUpdate(false)} />
      ) : (
        <div className='pages-container'>
          <h1 className='title-page'>Detalles</h1>
          <div className="info details">
          <div>
            <span>Nombre: </span>
            <span>{product.name}</span>
          </div>
          <div>
            <span>Descripción: </span>
            <span>{product.description}</span>
          </div>
          <div>
            <span>Código: </span>
            <span>{product.code}</span>
          </div>
          <div>
            <span>Tamaño: </span>
            <span>{product.size}</span>
          </div>
          <div>
            <span>Color: </span>
            <span>{product.colour}</span>
          </div>
          <div>
            <span>Categoría: </span>
            <span>{product.category}</span>
          </div>
          <div>
            <span>Precio: </span>
            <span>{product.price}</span>
          </div>
          </div>
          <div className="buttons">
            <button className='yellow-button' onClick={() => setIsUpdate(true)}>Editar</button>
            <button className='grey-button' onClick={onClose}>Volver</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

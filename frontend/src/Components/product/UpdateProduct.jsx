import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProductAction } from './ProductAction'
import { updateProductFetch } from '../../Core/Services/productFetch'

const UpdateProduct = (props) => {

    const {
        product,
        onClose
    } = props

    const [formData, setFormData]= useState(product)

    const dispatch = useDispatch()

    const handlerChange = (e) => {
        console.log("Cambio:", e.target.name, e.target.value)
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    // const handlerUpdate = () => {
    //      console.log("Datos a actualizar:", formData)
    //     dispatch(updateProductAction(formData))
    //     onClose()
    // }
    const handlerUpdate = async () => {
        try {
          // Llamamos a la API y esperamos el producto actualizado
          const updated = await updateProductFetch(formData._id, formData)
      
          // Lo guardamos en Redux
          dispatch(updateProductAction(updated))
      
          // Cerramos modal
          onClose()
        } catch (error) {
          console.error('Error actualizando producto:', error)
        }
      }

  return (
    <div className='pages-container'>
        <h1 className='title-page'>Actualizar Producto</h1>
        <div className='info updated'>
        <div>
            <span>Nombre: </span>
            <input type="text" name='name' value={formData.name} onChange={handlerChange}/>
        </div>
        <div>
            <span>Descripción: </span>
            <input type="text" name='description' value={formData.description} onChange={handlerChange}/>
        </div>
        <div>
            <span>Código: </span>
            <input type="text" name='code' value={formData.code} onChange={handlerChange}/>
        </div>
        <div>
            <span>Tamaño: </span>
            <input type="text" name='size' value={formData.size} onChange={handlerChange}/>
        </div>
        <div>
            <span>Color: </span>
            <input type="text" name='colour' value={formData.colour} onChange={handlerChange}/>
        </div>
        <div>
            <span>Categoría: </span>
            <input type="text" name='category' value={formData.category} onChange={handlerChange}/>
        </div>
        <div>
            <span>Precio: </span>
            <input type="number" name='price' value={formData.price} onChange={handlerChange}/>
        </div>
        </div>
        <div className='buttons'>
            <button className='yellow-button' onClick={handlerUpdate}>Actualizar</button>
            <button className='red-button' onClick={onClose}>Cancelar</button>
        </div>
    </div>
  )
}

export default UpdateProduct
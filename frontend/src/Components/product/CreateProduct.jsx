import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProductAction } from './ProductAction'
import { createProductFetch } from '../../Core/Services/productFetch'

const CreateProduct = ({ onClose }) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    size: '',
    colour: '',
    category: '',
    price: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlerCreate = async () => {
    try {
      const token = localStorage.getItem('token')
      const newProduct = await createProductFetch(formData, token)

      dispatch(createProductAction(newProduct))
      alert('Producto creado correctamente')

      setFormData({
        name: '',
        description: '',
        code:'',
        size: '',
        colour: '',
        category: '',
        price:'',
      })

    } catch (error) {
      console.error('Error al crear producto:', error)
    }
  }

  return (
    <div className='pages-container'>
      <h1 className='title-page'>Crear Producto</h1>
      <form className='form-product-container'>
        <div className='form-group'>
          <span>Nombre: </span>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <span>Descripción: </span>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <span>Código: </span>
          <input type="text" name="code" value={formData.code} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <span>Tamaño: </span>
          <input type="text" name="size" value={formData.size} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <span>Color: </span>
          <input type="text" name="colour" value={formData.colour} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <span>Categoría: </span>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <span>Precio: </span>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </div>
      </form>
      <div className="buttons">
        <button className="yellowb button" onClick={handlerCreate}>Crear</button>
        <button className="redb button" type='button' onClick={onClose}>Cancelar</button>
      </div>
    </div>
  )
}

export default CreateProduct

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAction } from './ProductAction'
import { updateProductFetch } from '../../Core/Services/productFetch'
import { goToPageAction } from '../pages/PagesAction'

const UpdateProduct = (props) => {
    const { product, onClose } = props
    const [formData, setFormData] = useState(product)
    const dispatch = useDispatch()

    // 🔐 Traer el usuario desde Redux
    const user = useSelector((state) => state.loginReducer.user)
    const isAdmin = user?.role === 'admin'

    const handlerChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handlerUpdate = async () => {
        try {
            const updated = await updateProductFetch(formData._id, formData)
            dispatch(updateProductAction(updated))
            onClose()
        } catch (error) {
            console.error("Error actualizando producto:", error.message);
            alert(error.message);

            if (error.message === "Token expired") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                dispatch(goToPageAction("login"));
            }
        }
    }

    //Si el usuario no es admin, no permitir acceso
    if (!isAdmin) {
        dispatch(goToPageAction("menu")) // Redirigir al menú si no es admin
        return null
    }

    return (
        <div className='pages-container'>
            <h1 className='title-page'>Actualizar Producto</h1>
            <div>
                <div className='info-user'>
                    <span className='title-user'>Nombre: </span>
                    <input type="text" name="name" value={formData.name} onChange={handlerChange} />
                </div>
                <div className='info-user'>
                    <span className='title-user'>Descripción: </span>
                    <input type="text" name="description" value={formData.description} onChange={handlerChange} />
                </div>
                <div className='info-user'>
                    <span className='title-user'>Código: </span>
                    <input type="text" name="code" value={formData.code} onChange={handlerChange} />
                </div>
                <div className='info-user'>
                    <span className='title-user'>Tamaño: </span>
                    <input type="text" name="size" value={formData.size} onChange={handlerChange} />
                </div>
                <div className='info-user'>
                    <span className='title-user'>Color: </span>
                    <input type="text" name="colour" value={formData.colour} onChange={handlerChange} />
                </div>
                <div className='info-user'>
                    <span className='title-user'>Categoría: </span>
                    <input type="text" name="category" value={formData.category} onChange={handlerChange} />
                </div>
                <div className='info-user'>
                    <span className='title-user'>Precio: </span>
                    <input type="number" name="price" value={formData.price} onChange={handlerChange} />
                </div>
            </div>
            <div className='buttons'>
                <button className='yellowb button' onClick={handlerUpdate}>Actualizar</button>
                <button className='redb button' onClick={onClose}>Cancelar</button>
            </div>
        </div>
    )
}

export default UpdateProduct

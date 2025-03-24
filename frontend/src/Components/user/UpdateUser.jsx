import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserFetch } from '../../Core/Services/userFetch'
import { loadInfoAction } from './UserAction'

const UpdateUser = ({user, onClose}) => {

  const [form, setForm] =useState({...user})
  const [profileImage, setProfileImage] =useState(null)
  const dispatch = useDispatch()

  const handlerChange = (e) => {
    const {name, value, files} = e.target;
    if (name === "profileImage") {
      setProfileImage(files[0])
    } else {
      setForm({...form, [name]: value})
    }
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()

    for (let key in form) {
      data.append(key, form[key])
    }
    if (profileImage) {
      data.append("profileImage", profileImage)
    }
    try {
      const token =localStorage.getItem("token")
      const updatedUser = await updateUserFetch(user._id, data, token)

      dispatch(loadInfoAction(updatedUser))
      onClose()
    } catch (error) {
      
    }
  }
  //Para el botón de guardar
//   const handlerUpdate = () => {
//     dispatch(update(formData))
//     onClose()
// }


  return (
    <div>
      <form onSubmit={handlerSubmit}>

      <label>
        Nombre:
        <input type="text" name="name" value={form.name} onChange={handlerChange} />
      </label>

      <label>
        Apellidos:
        <input type="text" name="lastName" value={form.lastName} onChange={handlerChange} />
      </label>

      <label>
        Dirección:
        <input type="text" name="address" value={form.address} onChange={handlerChange} />
      </label>

      <label>
        Código Postal:
        <input type="text" name="postalCode" value={form.postalCode} onChange={handlerChange} />
      </label>

      <label>
        Localidad:
        <input type="text" name="town" value={form.town} onChange={handlerChange} />
      </label>

      <label>
        Imagen de perfil:
        <input type="file" name="profileImage" accept="image/*" onChange={handlerChange} />
      </label>

      <button className='yellow-button' type="submit">Guardar cambios</button>
      <button className='red-button' type="button" onClick={onClose}>Cancelar</button>
    </form>
    </div>
  )
}

export default UpdateUser
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserFetch } from '../../Core/Services/userFetch'
import { loadInfoAction } from './UserAction'

const UpdateUser = ({ user, onClose }) => {

  const [form, setForm] = useState({ ...user })
  const [profileImage, setProfileImage] = useState(null)
  const dispatch = useDispatch()

  const handlerChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setProfileImage(files[0])
    } else {
      setForm({ ...form, [name]: value })
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
      const token = localStorage.getItem("token")
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
    <div className='pages-container'>
      <div>
        <div className='info-user'>
          <span className='title-user'>Nombre: </span>
          <input type="text" value={user.name} readOnly />
        </div>
        <div className='info-user'>
          <span className='title-user'>Apellidos: </span>
          <input type="text" value={user.lastName} readOnly />
        </div>
        <div className='info-user'>
          <span className='title-user'>Dirección: </span>
          <input type="text" value={user.address} readOnly />
        </div>
        <div className='info-user'>
          <span className='title-user'>Código Postal: </span>
          <input type="text" value={user.postalCode} readOnly />
        </div>
        <div className='info-user'>
          <span className='title-user'>Localidad: </span>
          <input type="text" value={user.town} readOnly />
        </div>
        <div className='info-user'>
          <span className='title-user'>Provincia: </span>
          <input type="text" value={user.province} readOnly />
        </div>
        <div className='info-user'>
          <span className='title-user'>Email: </span>
          <input type="email" value={user.email} readOnly />
        </div>
        <div className='info-user'>
          <span className='title-user'>Contraseña: </span>
          <input type="password" value={user.password} />
        </div>
      </div>
      <div className='buttons'>

        <button className='yellowb button' type="submit">Guardar cambios</button>
        <button className='redb button' type="button" onClick={onClose}>Cancelar</button>
      </div>

    </div>
  )
}

export default UpdateUser
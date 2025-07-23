import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserFetch } from '../../Core/Services/userFetch'
import { loadInfoAction } from '../login/LoginAction'

const UpdateUser = ({ user, onClose }) => {

  const [form, setForm] = useState({ 
    name: user?.name || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    postalCode: user?.postalCode || "",
    town: user?.town || "",
    province: user?.province || "",
    email: user?.email || "",
    password: user?.password || "",
 })
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
      const updatedUser = await updateUserFetch(data, token)
      console.log("Usuario actualizado:", updatedUser);
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
      <div className='form-updated-user'>
        <div className='info-user'>
          <div className="image-profile">
            <span className="title-user">Imagen de perfil:</span>
            <input type="file" name='profileImage' accept='image/*' onChange={handlerChange} />
          </div>
        </div>
        <div className='info-user'>
          <span className='title-user'>Nombre: </span>
          <input type="text" name='name' value={form.name} onChange={handlerChange} />
        </div>
        <div className='info-user'>
          <span className='title-user'>Apellidos: </span>
          <input type="text" name='lastName' value={form.lastName} onChange={handlerChange} />
        </div>
        <div className='info-user'>
          <span className='title-user'>Dirección: </span>
          <input type="text" name='address' value={form.address} onChange={handlerChange} />
        </div>
        <div className='info-user'>
          <span className='title-user'>Código Postal: </span>
          <input type="text" name='postalCode' value={form.postalCode} onChange={handlerChange} />
        </div>
        <div className='info-user'>
          <span className='title-user'>Localidad: </span>
          <input type="text" name='town' value={form.town} onChange={handlerChange} />
        </div>
        <div className='info-user'>
          <span className='title-user'>Provincia: </span>
          <input type="text" name='province' value={form.province} onChange={handlerChange} />
        </div>
        <div className='info-user'>
          <span className='title-user'>Email: </span>
          <input type="email" name='email' value={form.email} onChange={handlerChange} />
        </div>
        <div className='info-user'>
          <span className='title-user'>Contraseña: </span>
          <input type="password" name='password' value={form.password} onChange={handlerChange}/>
        </div>
      </div>
      <div className='buttons'>
        <button className='yellowb button' type="submit" onClick={handlerSubmit}>Guardar cambios</button>
        <button className='redb button' type="button" onClick={onClose}>Cancelar</button>
      </div>

    </div>
  )
}

export default UpdateUser
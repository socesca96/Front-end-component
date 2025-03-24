import React, { useState } from 'react'
import UpdateUser from './UpdateUser'
import { useDispatch, useSelector } from 'react-redux'
import { goToPageAction } from '../pages/PagesAction'

const UserDetail = (props) => {
  const {
    onClose
  } = props

  const user = useSelector((state) => state.loginReducer.user);
  console.log("👤 Usuario en UserDetail:", user);

  const [isUpdate, setIsUpdate] = useState(false) 

  const dispatch = useDispatch()

  const handlerCancel = () => {
    dispatch(goToPageAction('home'))
    onClose()
  }

  if (!user) {
    return (
      <div>
      <p>Cargando usuario...</p>
    </div>
    )
  }

  return (
    <div className='pages-container'>
      <h1 className='title-page'>Mi perfil</h1>
      {isUpdate ? (
        <UpdateUser user={user} onClose={() => setIsUpdate(false)}/>
      ) : (
        <div className='user-detail'>
          <div className='image-profile'>
          <span>Imagen</span>
          <img src={`http://localhost:3000/uploads/${user.profileImage}`} alt="Foto de perfil" />
          <input type="file" name='profileImage' readOnly/>
          </div>
          <div className='info'>
          <span>Nombre</span>
          <input type="text" value={user.name} readOnly/>
          <span>Apellidos</span>
          <input type="text" value={user.lastName} readOnly/>
          <span>Dirección</span>
          <input type="text" value={user.address} readOnly/>
          <span>Código Postal</span>
          <input type="text" value={user.postalCode} readOnly/>
          <span>Localidad</span>
          <input type="text" value={user.town} readOnly/>
          <span>Provincia</span>
          <input type="text" value={user.province} readOnly/>
          <span>Email</span>
          <input type="text" value={user.email} readOnly/>
          <span>Contraseña</span>
          <input type="password" value={user.password} readOnly/>
          </div>
          <div className='buttons'>

          <button className='yellow-button' onClick={() => setIsUpdate(true)}>Editar</button>
          <button className='grey-button' onClick={() => handlerCancel()}>Volver</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetail
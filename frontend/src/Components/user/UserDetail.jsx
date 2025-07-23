import React, { useState } from 'react'
import UpdateUser from './UpdateUser'
import { useDispatch, useSelector } from 'react-redux'
import { goToPageAction } from '../pages/PagesAction'
import { doLogoutAction } from '../login/LoginAction'

const UserDetail = (props) => {
  const {
    onClose
  } = props

  const user = useSelector((state) => state.loginReducer.user);

  const [isUpdate, setIsUpdate] = useState(false)

  const dispatch = useDispatch()

  const handlerCancel = () => {
    dispatch(goToPageAction('home'))
    onClose()
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(doLogoutAction());
    dispatch(goToPageAction("login")); // redirigir al login
  };

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
        <UpdateUser user={user} onClose={() => setIsUpdate(false)} />
      ) : (
        <div className='user-detail'>
          <div className='image-profile'>
            {user.profileImage ? (
              <img src={`http://localhost:3000/uploads/${user.profileImage}`} alt="Foto de perfil" />
            ) : (
              <p>No hay imagen de perfil</p>
            )}
          </div>
          <div>
            <div className='info-user'>
              <span className='title-user'>Nombre: </span>
              <span>{user.name}</span>
            </div>
            <div className='info-user'>
              <span className='title-user'>Apellidos: </span>
              <span>{user.lastName}</span>
            </div>
            <div className='info-user'>
              <span className='title-user'>Dirección: </span>
              <span>{user.address}</span>
            </div>
            <div className='info-user'>
              <span className='title-user'>Código Postal: </span>
              <span>{user.postalCode}</span>
            </div>
            <div className='info-user'>
              <span className='title-user'>Localidad: </span>
              <span>{user.town}</span>
            </div>
            <div className='info-user'>
              <span className='title-user'>Provincia: </span>
              <span>{user.province}</span>
            </div>
            <div className='info-user'>
              <span className='title-user'>Email: </span>
              <span>{user.email}</span>
            </div>
            <div className='info-user'>
              <span className='title-user'>Contraseña: </span>
              <span>************</span>
            </div>
          </div>
          <div className='buttons'>
            <button className='yellowb button' onClick={() => setIsUpdate(true)}>Editar</button>
            <button className='greyb button' onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetail
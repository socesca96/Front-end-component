import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLoginFetch, registerUser } from "../Core/Services/loginFetch";
import { doLoginAction } from "../Components/login/LoginAction";
import HomePages from "./HomePages";
import { goToPageAction } from "../Components/pages/PagesAction";

const LoginPage = () => {
    const { user } = useSelector((state) => state.loginReducer);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flagLogin, setFlagLogin] = useState(true);
    const [registerInfo, setRegisterInfo] = useState({});
    const [profileImage, setProfileImage] = useState(null);

    const dispatch = useDispatch();

    const doLogin = async () => {
        try {
                const userInfo = await doLoginFetch(email, password);
    
                if (!userInfo || !userInfo.token || !userInfo.user) {
                    alert("Error al iniciar sesión");
                    return;
                }
             
                //Eliminar contraseña del objeto user
                delete userInfo.user.password;
            
                // Guardar en localStorage
                localStorage.setItem("token", userInfo.token);
                localStorage.setItem("user", JSON.stringify(userInfo.user));
    
                //Guardar en Redux
                dispatch(doLoginAction({
                    user: userInfo.user,
                    token: userInfo.token,
                  }));
    
                //Navegar a otra visita
                dispatch(goToPageAction("user-detail"));
            } catch (error) {
                console.error("Error en login:", error);
                alert("Error en login")
            }
    };
    const doRegister = async () => {
        const data = new FormData();
        for (const key in registerInfo) {
            data.append(key, registerInfo[key]);
        }
    
        if (profileImage) {
            data.append('profileImage', profileImage); 
        }
    
        try {
            const userInfo = await registerUser(data);
          
    
            delete userInfo.user?.password;
    
            //Guardar en localStorage
            localStorage.setItem("token", userInfo.token);
            localStorage.setItem("user", JSON.stringify(userInfo.user));
    
            dispatch(doLoginAction({
                user: userInfo.user,
                token: userInfo.token,
              }));
            dispatch(goToPageAction("user-detail"));
    
            // Limpiar formulario
            setRegisterInfo({});
            setProfileImage(null);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        }
    };

    const handlerFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };
    const handlerRegisterInfo = (name, value) => {
        setRegisterInfo({
            ...registerInfo,
            [name]: value,
        });
    };

    return (
        <div className='pages-container'>
            {flagLogin ? (
                    <div>
                        <h1 className='title-page'>Iniciar Sesión</h1>
                        <div className="login-container">
                            <div>
                                <span>Email: </span>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <span>Contraseña: </span>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="buttons login">
                                <button className='yellowb button' onClick={doLogin}>Iniciar Sesión</button>
                            <button className="register-button" onClick={() => setFlagLogin(false)}>
                                Quiero registrarme
                            </button>
                            </div>
                        </div>
                       
                    </div>
                ) : (
                    <div className="pages-container">
                        <h1 className='title-page'>Registro</h1>
                        <div className="form-updated-user">
                            <div className="info-user">
                                <div className="image-profile">
                                <span>Imagen</span>
                               {user?.profileImage && (
                                <img
                                    src={`http://localhost:3000/uploads/${user.profileImage}`}
                                    alt="Foto de perfil"
                                />
                               )}
                                <input type="file" name="profileImage" onChange={handlerFileChange} />
                                </div>
                            </div>
                            <div className="info-user">
                                <span className="title-user">Nombre </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={registerInfo.name}
                                    placeholder="Nombre"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="info-user">
                                <span>Apellidos </span>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={registerInfo.lastName}
                                    placeholder="Apellidos"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                />
                            </div>
                            <div className="info-user">
                                <span>Dirección </span>
                                <input
                                    type="text"
                                    name="address"
                                    value={registerInfo.address}
                                    placeholder="Dirección"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                />
                            </div>
                            <div className="info-user">
                                <span>Código Postal</span>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={registerInfo.postalCode}
                                    placeholder="Código Postal"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                />
                            </div>
                            <div className="info-user">
                                <span>Localidad </span>
                                <input
                                    type="text"
                                    name="town"
                                    value={registerInfo.town}
                                    placeholder="Localidad"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                />
                            </div>
                            <div className="info-user">
                                <span>Provincia</span>
                                <input
                                    type="text"
                                    name="province"
                                    value={registerInfo.province}
                                    placeholder="Provincia"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                />
                            </div>
                            <div className="info-user">
                                <span>Email </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerInfo.email}
                                    placeholder="Email"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="info-user">
                                <span>Contraseña </span>
                                <input
                                    type="password"
                                    name="password"
                                    value={registerInfo.password}
                                    placeholder="Contraseña"
                                    onChange={(e) =>
                                        handlerRegisterInfo(e.target.name, e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="buttons register">
                                <button className='yellowb button' onClick={doRegister}>Registrarme</button>
                            </div>
                        </div>
                        <div className="buttons">
                            <button button className='greyb button' onClick={() => setFlagLogin(true)}>Volver</button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default LoginPage;

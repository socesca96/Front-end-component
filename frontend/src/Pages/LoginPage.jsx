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
            const userInfo = await doLoginFetch(email, password);
            console.log("userInfo", userInfo);
        
            //Eliminar contraseña del objeto user
            delete userInfo.user?.password;
        
            // Guardar en localStorage
            localStorage.setItem("token", userInfo.token);
            localStorage.setItem("user", JSON.stringify(userInfo.user));
        
            dispatch(doLoginAction({
                user: userInfo,
                token: userInfo.token,
              }));
            dispatch(goToPageAction("user-detail"));
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
            console.log("userInfo", userInfo);
    
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
                        <div>
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
                            <div>
                                <button className='yellow-button' onClick={doLogin}>Iniciar Sesión</button>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => setFlagLogin(false)}>
                                Quiero registrarme
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className='title-page'>Registro</h1>
                        <div className="form">
                            <div>
                                <span>Imagen</span>
                               {user?.profileImage && (
                                <img
                                    src={`http://localhost:3000/uploads/${user.profileImage}`}
                                    alt="Foto de perfil"
                                />
                               )}
                                <input type="file" name="profileImage" onChange={handlerFileChange} />
                            </div>
                            <div>
                                <span>Nombre </span>
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
                            <div>
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
                            <div>
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
                            <div>
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
                            <div>
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
                            <div>
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
                            <div>
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
                            <div>
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
                            <div>
                                <button className='yellow-button' onClick={doRegister}>Registrarme</button>
                            </div>
                        </div>
                        <div>
                            <button button className='grey-button' onClick={() => setFlagLogin(true)}>Volver</button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default LoginPage;

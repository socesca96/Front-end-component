import React from 'react'
import logo1 from "../../assets/logo-header.svg"
import menu from "../../assets/Menu.svg"
import search from "../../assets/Search.svg"
import profile from "../../assets/Account.svg"
import cart from "../../assets/Cart.svg"
import { useDispatch } from 'react-redux'
import { goToPageAction } from '../pages/PagesAction'

const HeaderComponent = () => {

const dispatch = useDispatch()

const handlerLogin = () => {
    // dispatch(doLoginAction(userInfo))
    dispatch(goToPageAction("login"))
}
const handlerGoToHome = () => {
    dispatch(goToPageAction("home"))
}

const handlerGoToCart = () => {
    dispatch(goToPageAction("cart"))
}
const handlerSearch = () => {
    dispatch(goToPageAction("search"))
}
const handlerMenu = () => {
    dispatch(goToPageAction("menu"))
}

    return (
            <div className='header-container'>
                <div className='announcement'>
                    <p>Envio gratis a toda la península</p>|<p>Pedidos de hasta 10kg</p>
                </div>
                <header className='header'>
                    <div className="first-container">
                    <div className='icon-menu' onClick={handlerMenu}>
                        <img src={menu} alt="Icono menu forma de hamburguesa" />
                    </div>
                    <div className='logo' onClick={handlerGoToHome}>
                        <img src={logo1} alt="Logo de la tienda"/>
                    </div>
                    <nav className='small-menu'>
                        <div className='icon-menu' onClick={handlerSearch}>
                        <img src={search} alt="Icono lupa" />
                        </div>
                        <div className='icon-menu' onClick={handlerLogin}>
                        <img src={profile} alt="Icono perfil" />
                        </div>
                        <div className='icon-menu' onClick={handlerGoToCart}>
                        <img src={cart} alt="Icono carrito" />
                        </div>
                    </nav>
                    </div>
                    {/* Las categorías solo las mostraré en pantallas grandes */}
                    <div className='second-container'>
                        <p className='category-product'>Pintura Plástica y Revestimiento</p>
                        <p className='category-product'>Esmaltes Sintéticos</p>
                        <p className='category-product'>Esmaltes al Agua</p>
                        <p className='category-product'>Barnices</p>
                        <p className='category-product'>Impermeabilizantes</p>
                        <p className='category-product'>Sprays</p>
                    </div>
                </header>
            </div>
    )
}

export default HeaderComponent
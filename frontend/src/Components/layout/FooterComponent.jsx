import React from 'react'
import logo2 from "../../assets/logo-footer.svg"
import { useDispatch } from 'react-redux'
import { goToPageAction } from '../pages/PagesAction'

const FooterComponent = () => {

    const dispatch = useDispatch()

    const handlerGoToContact = () => {
        dispatch(goToPageAction("contact"))
    }
  return (
    <div className='footer-container'>
        <div className="logo-footer">
            <img src={logo2} alt="Logo con el nombre de la empresa" />
        </div>
        <div className="second-container-footer">
            <h3 className='title-footer'>Contacto</h3>
            <div className='info-footer'>
                <ul>
                    <li>
                        <p>Avenida Marqués de Santillana, 14270 Hinojosa del Duque, Córdoba</p>
                    </li>
                    <li>
                        <p>hinocolor@gmail.com</p>
                    </li>
                    <li>
                        <p>Telefono: 957.141.834</p>
                    </li>
                    <li>
                        <p>Lunes-Viernes: 8.00-13.30/16.30-20.00</p>
                        <p>Sábados: 9.00-13.30</p>
                    </li>
                </ul>
            </div>

        </div>
        <div className='second-container-footer' onClick={handlerGoToContact}>
            <h3 className='title-footer'>Créditos y derechos</h3>
            <ul>
                <li>
                    <p>2025. Pinturas y Decoración Tomas Murillo. Todos los derechos reservados</p>
                </li>
                <li>
                    <p>Desarrollado por Soledad de Céspedes Caja</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default FooterComponent
import React from 'react'
import image1 from '../assets/image-home.png'
import image2 from '../assets/image-text1.png'
import image3 from '../assets/image-text2.png'

const HomePages = () => {
  return (
    <div className='home-container'>
        <div className='first-home-container'>
          <img className='image1' src={image1} alt="" />
        </div>
        <div className='second-home-container'>
          <div className='box-wrapper'>
          <div className='box'>
            <p>Ofertas para profesionales</p>
          </div>
          <div className='box'>
            <p>Productos de primeras marcas</p>
          </div>
          <div className='box'>
            <p>Envío GRATUITO a toda la península</p>
          </div>
          <div className='box'>
            <p>Asesoramiento personalizado</p>
          </div>
          </div>
        </div>
        <div className='third-home-container'>
          <div className='colour-box'>
            <img className='colour-image' src={image2} alt="" />
            <div className='colour-info'>
              <p>Colores únicos para espacios únicos</p>
              <p>Llámanos y te ayudamos a encontrar el tono perfecto</p>
              <p>Telf.957.141.834</p>
            </div>
          </div>
          <div className='colour-box reverse'>
            <div className='colour-info reverse'>
              <p>Pinturas para cada necesidad. Si tienes dudas, nuestro equipo te guiará en la mejor elección</p>
            </div>
            <img className='colour-image' src={image3} alt="" />
          </div>
        </div>
    </div>
  )
}

export default HomePages
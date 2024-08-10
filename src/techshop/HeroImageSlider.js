import React from 'react'
import { Link } from 'react-router-dom'


function HeroImageSlider({item}) {
    const{id,title,heroImage, tagline,finalPrice,originalPrice,type}=item
   
  return (
    <div className='heroImageSlider'>
    <h2 className='type'>{type}</h2>
    <div className='heroImageSlider-content'>
    <div>
    
      <h1>{title}</h1>
      <h2 className='tagline'>{ tagline}</h2>
      <p className='Fprice'>{finalPrice}   <strike className='Oprice'>{originalPrice}</strike></p>
    <Link to={`/ProductInfo/${id}`}><button>shopnow</button></Link>
      </div>
      <div>
      <img src={heroImage} alt={title}/>
      </div>
    </div>
    </div>
  )
}

export default HeroImageSlider

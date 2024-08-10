import React from 'react'



// import 'swiper/css';

function FetauredProducts({item}) {
    const{title,    images,originalprice,finalprice}=item
  return (
    

    <div className='featured-produts '>
      <h3>{title}</h3>
      <img src={images[0]} alt={title}/>
      <p>{finalprice}<span>{originalprice}</span></p>
    </div>
   

  )
}

export default FetauredProducts
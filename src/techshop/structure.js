import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../App';
import {Link} from "react-router-dom"


function Structure({item,}) {
  
  const handleImageClick = () => {
    changeHeroImage(item.images[0]); // Assuming your related product item has an 'image' property
  };
  const {addToCart,productDetails,changeHeroImage}=useContext(UserContext)

  const spanElements = [];

 

  // Using a for loop to iterate over the rateCount
  for (let i = 0; i < item.rateCount; i++) {
    spanElements.push(<span key={i} className='star'><FontAwesomeIcon icon={faStar} /></span>);
  }
  
  return (
    <div className='container' onClick={handleImageClick}>
   
    <div >
    <Link to="/ProductInfo"> <img src={item.images[0]} alt="img" onClick={()=>productDetails(item)}/></Link>
      <div>
        {spanElements} 
      </div>
      <h1 className='title'>{item.title}</h1>
      <p className='info'>{item.info}</p>
      <hr/>
      <p className='Fprice'>₹{item.finalPrice}  <span className='Oprice'><strike>₹{item.originalPrice}</strike></span></p>
      <button onClick={()=>addToCart(item)}>Add To Cart</button>
    </div>
    
    </div>
  );
}

export default Structure;
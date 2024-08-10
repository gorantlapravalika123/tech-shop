import React from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Footer from './footer';

function Cart({ cartItems, removeItem, originalPrice, discountPrice, totalPrice, incrementQuantity, decrementQuantity, cartCount }) {

  const maxQuantity = 5; 
  const minQuantity = 1; 

  return (
    <>
      <div id="cart_section"> 
        {/* Render the cart items if there are any */}
        {cartItems.length > 0 ? (
          <>
            <div id="cart_section1">
              <div id="cart_products">
                {/* Map through each item in the cart */}
                {cartItems.map(item => (
                  <div key={item.id}>
                    <div id="cartproductimg">
                      <div>
                        <img src={item.images[0]} alt={item.title} id="cart_images" />
                      </div>
                      <div>
                        <h3 id="title">{item.title}</h3>
                        <p id="info">{item.info}</p>                    
                        <div id="price">
                          <h3 id="finalprice">₹{item.finalPrice}</h3>
                          <h3><strike id="originalprice">₹{item.originalPrice}</strike></h3> <br />
                        </div>
                      </div>
                      
                      <div>
                        {/* remove butoon of the cart */}
                        {removeItem && (
                          <p id="product_remove_btn" onClick={() => removeItem(item.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </p>
                        )}
                      </div><br/>
                      <div id="inc_dec_quantity">
                        {/* Buttons to adjust item quantity */}
                        <button 
                          id="increment_quantity_btn" 
                          onClick={() => {
                            if (item.quantity < maxQuantity) {
                              incrementQuantity(item.id);
                            }
                          }}
                        >
                          +
                        </button>
                        <span id="quantity">{item.quantity}</span>
                        <button 
                          id="decrement_quantity_btn" 
                          onClick={() => {
                            if (item.quantity > minQuantity) {
                              decrementQuantity(item.id);
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                    
                    </div> 
                  </div>
                ))}
              </div>
              {/* Display total price */}
              <div id="cart_section2">
                <h1>Order Summary{cartCount} (items)</h1>
                <div id="original_price">
                  <h3>Original Price</h3>
                  <h3 className='original_price'> ₹{originalPrice ? originalPrice.toFixed(2) : '0.00'}</h3>
                </div>
                <div id="discount_price">
                  <h3>Discount</h3>
                  <h3 className='discount_price'>-₹{discountPrice ? discountPrice.toFixed(2) : '0.00'}</h3> 
                </div>
                <div id="delivery">
                  <h3>Delivery</h3>
                  <h3 className="delivery">Free</h3>
                </div>
                <hr></hr>
                <h1>Total Price: ₹{totalPrice ? totalPrice.toFixed(2) : '0.00'}</h1>
                <button id="check_out_btn">Check Out</button>
              </div> 
            </div>
          </>
        ) : (
          // If cart is empty, display a message and a button to start shopping
          <div id="empty-cart">
            <FontAwesomeIcon icon={faShoppingCart} id="empty_cart_image" />
            <h1 id="cart_empty_heading">Your Cart is Empty</h1>
            <Link to="/product" className="link-text">
              <button id="cart_shopping_btn">Start Shopping</button>
            </Link>
          </div>
        )}
      </div>
      {/* Render the Footer component */}
      <Footer/>
    </>
  );
}

export default Cart;


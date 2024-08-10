


import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './techshop/navbar';
import Main from './techshop/main';
import Cart from './techshop/cart';
import Product from './techshop/product';
import ProductInfo from './techshop/productinfo';
import './App.css';


export const UserContext = React.createContext();

function App() {
  // State variables for managing product, hero image, cart items, and prices
  const [product, setProduct] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  // Function to add item to cart
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      setCartCount(prevCount => prevCount + 1);
    }
    setOriginalPrice(originalPrice => originalPrice + parseFloat(item.originalPrice));
    setDiscountPrice(discountPrice => discountPrice + parseFloat(item.originalPrice - item.finalPrice));
    setTotalPrice(totalPrice => totalPrice + parseFloat(item.finalPrice));
  };

  // Function to remove item from cart
  const removeItemFunction = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Function to increment quantity of an item in cart
  const incrementQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        setOriginalPrice(originalPrice => originalPrice + parseFloat(updatedItem.originalPrice));
        setDiscountPrice(discountPrice => discountPrice + parseFloat(updatedItem.originalPrice - updatedItem.finalPrice));
        setTotalPrice(totalPrice => totalPrice + parseFloat(updatedItem.finalPrice));
        return updatedItem;
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to decrement quantity of an item in cart
  const decrementQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        setOriginalPrice(originalPrice => originalPrice - parseFloat(updatedItem.originalPrice));
        setDiscountPrice(discountPrice => discountPrice - parseFloat(updatedItem.originalPrice - updatedItem.finalPrice));
        setTotalPrice(totalPrice => totalPrice - parseFloat(updatedItem.finalPrice));
        return updatedItem;
      }
      return item;
    });

    setCartItems(updatedCartItems);   
  };

  // Function to change hero image
  const changeHeroImage = (image) => {
    setHeroImage(image);
  };

  // Function to set product details
  const productDetails = (item) => {
    setProduct(item);
  };

  return (
    // Provide context to components

<UserContext.Provider value={{ productDetails, product, heroImage, changeHeroImage, setProduct }}>
  <div className="App">
        {/* Render Navbar with cart count */}
        <Navbar cartCount={cartCount}/>
        {/* Define routes */}
        <Routes>
          {/* Route for main page */}
          <Route path="/" element={<Main addtocart={addToCart} />} />
          {/* Route for cart page */}
          <Route path="/cart" element={<Cart cartItems={cartItems} removeItem={removeItemFunction} originalPrice={originalPrice} discountPrice={discountPrice} totalPrice={totalPrice} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} cartCount={cartCount} />} />
          {/* Route for product page */}
          <Route path="/product" element={<Product addtocart={addToCart} />} />
          {/* Route for product info page */}
          <Route path="/productinfo" element={<ProductInfo addtocart={addToCart}  />} />
          

        </Routes>
      </div> 
    </UserContext.Provider>             
  );
}

export default App;


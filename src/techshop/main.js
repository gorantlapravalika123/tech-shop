

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import productsData from './productData'; 
import { Link } from 'react-router-dom'; 
import Footer from './footer'; 
import Advantages from './advantages'; 
import  FetauredProducts from './featureproducts'
import HeroImageSlider from "./HeroImageSlider";


import { Swiper,SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { EffectCoverflow, Pagination, Autoplay, A11y ,Mousewheel} from 'swiper/modules';


function Main(props) {
    const addtocart = props.addtocart; 
    const [category, setCategory] = useState('all'); 
    const [buttonColors, setButtonColors] = useState({}); 
  
    

    useEffect(() => {
        // Initialize button colors state
        const initialButtonColors = {};
        productsData.forEach(product => {
            initialButtonColors[product.id] = 'red'; 
        });
        setButtonColors(initialButtonColors);
    }, []);

    // Function to handle category change
    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    // Function to handle adding an item to cart
    const handleAddToCart = (item) => {
        addtocart(item); 
        // Change button color to green to indicate success
        setButtonColors(prevColors => ({
            ...prevColors,
            [item.id]: 'green'
        }));

        // Reset button color to red after 1 second
        setTimeout(() => {
            setButtonColors(prevColors => ({
                ...prevColors,
                [item.id]: 'red'
            }));
        }, 1000);
    };

    // Filter products based on selected category
    const filteredProducts = category === 'all' ? productsData : productsData.filter(product => product.category.toLowerCase() === category);

    return (
        <>
       
            <div className='main'>


                <div>
                <Swiper
            modules={[EffectCoverflow, Pagination, A11y,Autoplay]}
            loop={true}
            speed={400}
            mousewheel={true}
            spaceBetween={100}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            effect={"coverflow"}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 1,
                    spaceBetween: 250
                },
            }}
            
            className="featured_swiper"
        >
    <div>
  {productsData.filter(item => item.tag === "hero-product").map((item, index) => (
    <SwiperSlide key={index}>
    <HeroImageSlider  item={item}/>
    </SwiperSlide>
  ))}
</div>
</Swiper>       
         

                </div>




                <>
                <center>
                    <h1 id="featured_product">Feature products</h1>
                </center>
                <Swiper
            modules={[EffectCoverflow, Pagination, A11y,Mousewheel]}
            loop={true}
            speed={400}
            mousewheel={true}
            spaceBetween={100}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            effect={"coverflow"}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250
                },
            }}
            onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
            className="featured_swiper"
        >

    <div>
    {
      productsData
        .filter(item => item.tag === "featured-product")
        .map((item, index) => (
          <SwiperSlide key={index}>
          
            <FetauredProducts item={item} />
            </SwiperSlide>
        ))
    }
    
    </div>
       </Swiper>
                </>
             
                <center>
                    <h1>Top products</h1>
                </center>
                {/* Buttons to filter products by category */}
                <div className="btns">
                    <button id="allbtn" onClick={() => handleCategoryChange('all')} style={{ backgroundColor: category === 'all' ? 'red' : 'inherit' }}>All</button>
                    <button id="headphonesbtn" onClick={() => handleCategoryChange('headphones')} style={{ backgroundColor: category === 'headphones' ? 'red' : 'inherit' }}>Headphones</button>
                    <button id="earbuds" onClick={() => handleCategoryChange('earbuds')} style={{ backgroundColor: category === 'earbuds' ? 'red' : 'inherit' }}>Earbuds</button>
                    <button id="earphones" onClick={() => handleCategoryChange('earphones')} style={{ backgroundColor: category === 'earphones' ? 'red' : 'inherit' }}>Earphones</button>
                    <button id="neckbands" onClick={() => handleCategoryChange('neckbands')} style={{ backgroundColor: category === 'neckbands' ? 'red' : 'inherit' }}>Neckbands</button>
                </div>
                {/* Display filtered products */}
                <div id="products">
                    {filteredProducts.map(item => (
                        <div id="product" key={item.id}>
                            <div>
                                {/* Link to product info */}
                                <Link to="/productinfo" >
                                    <img src={item.images[0]} alt={item.title} id="images"/><br />
                                </Link>
                                {/* Display product ratings */}
                                {[...Array(item.rateCount)].map((_, index) => (
                                    <span id="ratingicon" key={index}><FontAwesomeIcon icon={faStar} /></span>
                                ))}
                                {/* Display product details */}
                                <h3 id="title">{item.title}</h3>
                                <p id="info">{item.info}</p><hr />
                                {/* Display product prices and add to cart button */}
                                <div id="price">
                                    <h3 id="finalprice">₹{item.finalPrice}</h3>
                                    <h3><strike id="originalprice">₹{item.originalPrice}</strike></h3> <br />
                                </div>
                                {/* Button to add item to cart */}
                                <button id="addtocartbtn" onClick={() => handleAddToCart(item)} style={{ backgroundColor: buttonColors[item.id] }}>{buttonColors[item.id] === 'green' ? 'Added' : 'Add to Cart'}</button>
                            </div>
                        </div>
                        
                    ))}
                    {/* Link to browse all products */}
                    <Link to="/product" className="link-text">
                        <h2 id="product_page_link">Browse all products</h2>
                    </Link>
                </div>
        
                <Advantages/>
                <Footer />
                
            </div>
        </>
    );
}

export default Main;



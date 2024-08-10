
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import reviewsData from './reviews';
import productsData from './productData';
import Structure from './structure';
import Advantages from './advantages';
import Footer from './footer';
import Carousel from "react-multi-carousel";

import { Swiper,SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { EffectCoverflow, Pagination, Autoplay, A11y ,Mousewheel} from 'swiper/modules';



function ProductInfo({ addtocart }) 

{
  const [activeSection, setActiveSection] = useState('specification');
  const { product, heroImage, changeHeroImage } = useContext(UserContext);
  const [buttonColors, setButtonColors] = useState({});

  useEffect(() => {
    const initialButtonColors = {};
    productsData.forEach(product => {
      initialButtonColors[product.id] = 'red';
    });
    setButtonColors(initialButtonColors);
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addtocart(product);
      setButtonColors(prevColors => ({
        ...prevColors,
        [product.id]: 'green'
      }));
      setTimeout(() => {
        setButtonColors(prevColors => ({
          ...prevColors,
          [product.id]: 'red'
        }));
      }, 1000);
    }
  };

  // Responsive settings for carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  return (
    <>
      <section id="product_info">
        <div className='product_info'>
          <div className='related-images-container'>
            
               {product && product.images && product.images.map((image, index) => (
               <img  id="heroimage"
              key={index}
               src={image}
               alt={product.title}
              className={heroImage === image ? 'related-images active' : 'related-images'}
              onClick={() => changeHeroImage(image)}
           />
          ))}
          </div>
          <div>
            <img src={heroImage} alt={product.title} className='hero-image' />
          </div>
          <div>
             {/* <h1 className='product-title'>{product.title}</h1>  */}
             <h1 className='product-title'>{product.title}</h1>              

            <h3 className='product-info'>{product.info}</h3>
            <div>
              {[...Array(product.rateCount)].map((_, index) => (
                <span key={index} className="star">
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
              <span className='ratings'>|{product.ratings} Ratings</span>
            </div>
            <hr />
            <div className='product-info-prices'>
              <div>
                <p className='Fprice'>₹{product.finalPrice} <span className='Oprice'><strike>₹{product.originalPrice}</strike></span></p>
                <p className='saving'>you save {product.originalPrice - product.finalPrice}</p>
                <p className='tax'>(inclusive of all taxes)</p>
              </div>
              <div>
                <button id="stock_btn">In stock</button>
              </div>
            </div>
            <hr />
            <h4>Offers and Discounts</h4>
            <section id="offer_discount_btn">
              <button id="emi_btn">No Cost EMI on Credit Card</button>
              <button id="cashback_btn">Pasy latter & Avail Cashback</button>
            </section>
            <button id="addtocartbtn" onClick={handleAddToCart} style={{ backgroundColor: buttonColors[product.id] }}>{buttonColors[product.id] === 'green' ? 'Added' : 'Add to Cart'}</button>
          </div>
        </div>
        <div className='section-buttons'>
          <button id='specificationBtn' className={activeSection === 'specification' ? 'active' : ''} onClick={() => setActiveSection('specification')}>
            Specification
          </button>
          <button id='overviewBtn' className={activeSection === 'overview' ? 'active' : ''} onClick={() => setActiveSection('overview')}>
            Overview
          </button>
          <button id='reviewBtn' className={activeSection === 'review' ? 'active' : ''} onClick={() => setActiveSection('review')}>
            Review
          </button>
        </div>
        <div className='product_r_s_o'>
          {activeSection === 'specification' && (
            <div className='specification'>
              <div>
                <p>Brand</p>
                <p>Model</p>
                <p>Generic Name</p>
                <p>Headphone Type</p>
                <p>Connectivity</p>
                <p>Microphone</p>
              </div>
              <div>
                <p>{product.brand}</p>
                <p>{product.title}</p>
                <p>{product.category}</p>
                <p>{product.type}</p>
                <p>{product.connectivity}</p>
                <p>yes</p>
              </div>
            </div>
          )}
          {activeSection === 'overview' && (
            <div>
              hiii
            </div>
          )}
          {activeSection === 'review' && (
            <div>
              {
                reviewsData.map((item, index) => (
                  <div key={index} className='reviews'>
                    <div>
                      <FontAwesomeIcon icon={faUser} className='user-icon' />
                    </div>
                    <div>
                      <h4 className='user-name'>{item.name}</h4>
                      {[...Array(item.rateCount)].map((_, index) => (
                        <span key={index} className="star">
                          <FontAwesomeIcon icon={faStar} />
                        </span>
                      ))}
                      <span style={{ color: "white" }}>|{item.date}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
        <div id="related_products">
          <center>
            <h1 id="related_products"> Related products</h1>
          </center>
          <Swiper
      modules={[EffectCoverflow, Pagination, A11y,Mousewheel]}
      loop={true}
      speed={400}
      mousewheel={true}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 70,
        modifier: 3,
        slideShadows: false,
    }}
      breakpoints={{
        768: {
            slidesPerView: 2,
            spaceBetween: 200
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 10
        },
    }}
      centeredSlides={false}
     
     
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
        {productsData
  .filter((item) => item.category === product.category)
  .map((item, index) => (
    <SwiperSlide key={index}>
    <div>
   
    <Structure key={index} item={item} changeHeroImage={changeHeroImage}/>
    </div>
    </SwiperSlide>
  
    
  ))
      }
      </Swiper>
        </div>
      </section>
      <Advantages />
      <Footer />
    </>
  );
}

export default ProductInfo;




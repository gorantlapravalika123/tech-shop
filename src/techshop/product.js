import React, { useState } from 'react';
import productsData from './productData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Footer from './footer';
import Advantages from './advantages';
// import { Link } from 'react-router-dom';

function Product(props) {
  const addtocart = props.addtocart;
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [priceRange, setPriceRange] = useState(0);
  const [buttonColors, setButtonColors] = useState({});
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  // Function to sort products based on different criteria
  const sortProducts = (criteria) => {
    let sortedProducts = [...filteredProducts];
    switch (criteria) {
      case 'latest':
        sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'featured':
        sortedProducts = sortedProducts.filter(product => product.tag === 'featured-product');
        break;
      case 'topRated':
        sortedProducts.sort((a, b) => b.ratings - a.ratings);
        break;
      case 'lowestPrice':
        sortedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case 'highestPrice':
        sortedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
    setSortBy(criteria);
    setIsFiltersApplied(true); 
  };

  // Function to toggle selected brands
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
    setIsFiltersApplied(true);
  };

  // Function to toggle selected categories
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setIsFiltersApplied(true);
  };

  // Function to clear all filters and sorting
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange(0);
    setFilteredProducts(productsData);
    setSortBy(null);
    setIsFiltersApplied(false); // Reset isFiltersApplied when filters are cleared
  };

  // Function to handle adding to cart
  const handleAddToCart = (item) => {
    addtocart(item);
    setButtonColors(prevColors => ({
      ...prevColors,
      [item.id]: 'green' 
    }));
    
    setTimeout(() => {
      setButtonColors(prevColors => ({
        ...prevColors,
        [item.id]: 'red' 
      }));
    }, 1000);
  };

  // Filter products based on selected brands, categories, and price range
  const filteredProductsDisplay = filteredProducts.filter(product => {
    const brandFilter = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const categoryFilter = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceFilter = priceRange === 0 || product.finalPrice <= priceRange;
    return brandFilter && categoryFilter && priceFilter;
  });

  return (
    <>
      <div className="products_data">
        <div className="section_1">
          {isFiltersApplied && (
            <div>
              <button onClick={clearAllFilters} id="clear_filter_btn">Clear Filter</button>
            </div>
          )}
          <div className='sort'>
            <h1>Sort By</h1><hr></hr>
            <h3 onClick={() => sortProducts('latest')} style={{ color: sortBy === 'latest' ? 'red' : 'inherit' }}>Latest</h3>
            <h3 onClick={() => sortProducts('featured')} style={{ color: sortBy === 'featured' ? 'red' : 'inherit' }}>Featured</h3>
            <h3 onClick={() => sortProducts('topRated')} style={{ color: sortBy === 'topRated' ? 'red' : 'inherit' }}>Top Rated</h3>
            <h3 onClick={() => sortProducts('lowestPrice')} style={{ color: sortBy === 'lowestPrice' ? 'red' : 'inherit' }}>Price (Lowest First)</h3>
            <h3 onClick={() => sortProducts('highestPrice')} style={{ color: sortBy === 'highestPrice' ? 'red' : 'inherit' }}>Price (Highest First)</h3>
          </div>
          <div className="brands">
            <h1>Filter By</h1><hr></hr>
            <h2>brands</h2>
            <label>
              <input
                type="checkbox"
                value="JBL"
                checked={selectedBrands.includes('JBL')}
                onChange={() => toggleBrand('JBL')}
              />
              JBL
            </label>
            <label>
              <input
                type="checkbox"
                value="boAt"
                checked={selectedBrands.includes('boAt')}
                onChange={() => toggleBrand('boAt')}
              />
              boAt
            </label>
            <label>
              <input
                type="checkbox"
                value="Sony"
                checked={selectedBrands.includes('Sony')}
                onChange={() => toggleBrand('Sony')}
              />
              Sony
            </label>
          </div>
          <div className='category'>
            <h1>Category</h1><hr></hr>
            <label>
              <input
                type="checkbox"
                value="Headphones"
                checked={selectedCategories.includes('Headphones')}
                onChange={() => toggleCategory('Headphones')}
              />
              Headphones
            </label>
            <label>
              <input
                type="checkbox"
                value="Earbuds"
                checked={selectedCategories.includes('Earbuds')}
                onChange={() => toggleCategory('Earbuds')}
              />
              Earbuds
            </label>
            <label>
              <input
                type="checkbox"
                value="Earphones"
                checked={selectedCategories.includes('Earphones')}
                onChange={() => toggleCategory('Earphones')}
              />
              Earphones
            </label>
            <label>
              <input
                type="checkbox"
                value="Neckbands"
                checked={selectedCategories.includes('Neckbands')}
                onChange={() => toggleCategory('Neckbands')}
              />
              Neckbands
            </label>
          </div>
          <div>
            <label htmlFor="rangeInput"><h1>Price</h1> </label>
            <input
              type="range"
              id="rangeInput"
              name="rangeInput"
              min="0"
              max="4000"
              step="50"
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <h2>{priceRange}</h2>
          </div>
        </div>

        <div className='section_2'>
          <div id="products">
            {filteredProductsDisplay.map(item => (
              <div id="product" key={item.id}>
                <div>
                  
                    <img src={item.images[0]} alt={item.title}  id="images"/><br></br>
                  
                 
                  {[...Array(item.rateCount)].map((_, index) => (
                    <span id="ratingicon" key={index}><FontAwesomeIcon icon={faStar} /></span>
                  ))}
                  <h3 id="title">{item.title}</h3>
                  <p id="info">{item.info}</p><hr></hr>
                  <div id="price">
                    <h3 id="finalprice">₹{item.finalPrice}</h3>
                    <h3><strike id="originalprice">₹{item.originalPrice}</strike></h3> <br />
                  </div>
                  <button
                    id="addtocartbtn"
                    onClick={() => handleAddToCart(item)}
                    style={{ backgroundColor: buttonColors[item.id] || 'red' }}
                  >
                    {buttonColors[item.id] === 'green' ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Advantages />
      <Footer />
    </>
  );
}

export default Product;

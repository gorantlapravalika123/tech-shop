import React, { useState,useContext } from "react";
import productsData from './productData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom"
import { UserContext } from "../App";


function SearchBar({ closeSearchBar }) {
    const{productDetails,changeHeroImage}=useContext(UserContext)
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        
        const filteredProducts = value.trim() !== "" ?
        productsData.filter(product =>
            product.title && product.title.toLowerCase().includes(value.toLowerCase())
        ) :
        [];
        setSearchResults(filteredProducts);
        setIsSearchOpen(true); // Open the search results
    };

    const handleCloseSearch = () => {
        setSearchQuery(""); // Clear the search query
        setSearchResults([]); // Clear the search results
        setIsSearchOpen(false); // Close the search results
        closeSearchBar(); // Close the search bar
      };

    return (
        <>
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for the products"
            />
            {isSearchOpen &&  searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map(product => (
                      <Link to="/productInfo">  <div key={product.id} className="search-result" onClick={()=>{productDetails(product); changeHeroImage(product.images[0]);handleCloseSearch();}}>{product.title}</div></Link>
                    ))}
                </div>
            )}
            {isSearchOpen && (
                
                <FontAwesomeIcon icon={faXmark} onClick={handleCloseSearch} className="close-icon" />
            )}
        </div>
        
        </>
       
    );
}

export default SearchBar;
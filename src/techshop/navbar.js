
import React, { useState ,useEffect} from "react";
import { Link ,useLocation} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";

function Navbar({ cartCount }) {
  
  const [showSignUp, setShowSignUp] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  //  current location for navigation
  const location = useLocation();

  // Close search bar when navigating to a new page
  useEffect(() => {
    setShowSearch(false);
  }, [location.pathname]); // Listen for changes in the route

  // Toggle search bar visibility
  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  // Close search bar
  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  // Toggle user profile visibility
  const handleProfileClick = () => {
    setShowSignUp(!showSignUp);
    setShowEmailInput(false); 
    setShowCreateAccount(false);
  };

  // Show email input for sign up
  const handleSignUpClick = () => {
    setShowEmailInput(true);
  };

  // Show create account form
  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
  };

  // Remove all signup related components
  const handleRemoveClick = () => {
    setShowSignUp(false);
    setShowEmailInput(false);
    setShowCreateAccount(false);
  };

  return (
    <div className="navbar">
      <div className="left-side">
        <h2 style={{ color: "white", padding: "15px", fontSize: "30px" }}>
          <b>Tech-shop</b>
        </h2>
      </div>

      <div className="right-side">
        <div className="nav-icons">
          <ul>
            <li>
              {/* Toggle search bar */}
              {showSearch ? <SearchBar closeSearchBar={handleCloseSearch} /> : <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} onClick={handleSearchClick} />}
            </li>
            <li>
              {/* Link to cart */}
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} style={{ color: "white" }} />
                <button id="cart_count_btn">{cartCount}</button>
              </Link>
            </li>
            <li style={{ position: "relative" }}>
              {/* Toggle user profile */}
              <FontAwesomeIcon icon={faUser} style={{ color: "white" }} onClick={handleProfileClick} />
              {/* Conditional rendering of sign up components */}
              {showSignUp && (
                <div className="sign-up-section">
                  {showCreateAccount ? (
                    // Create account form
                    <form className="signup-form">
                      <FontAwesomeIcon icon={faTimes} className="remove-icon"  onClick={handleRemoveClick} />
                      <h2>Signup</h2>
                      <p>Already have an account ? login</p>
                      <input type="text" placeholder="Username" id="form_data" /><br />
                      <input type="email" placeholder="Email"  id="form_data"/><br />
                      <input type="password" placeholder=" Password" id="form_data" /><br />
                      <input type="password" placeholder="Conform Password" id="form_data" /><br />
                      <button id="form_signup_btn" >SignUp</button>
                      <p>or login with</p>
                      <div id="form_btn">
                        <button id="facebook_btn">Facebook</button>
                        <button id="google_btn">Google</button>
                        <button id="twiter-btn">Twitter</button>
                      </div>
                    </form>
                  ) : (
                    showEmailInput ? (
                      // Login form
                      <form className="login-form">
                        <FontAwesomeIcon icon={faTimes} className="remove-icon"  onClick={handleRemoveClick} />
                        <h3>Login</h3>
                        <p>New to PRAVALIKA GORANTLA? <span onClick={handleCreateAccountClick}>Create an account</span></p>
                        <input type="email" placeholder="Email"  id="form_data"/><br />
                        <input type="password" placeholder="Password" id="form_data" /><br />
                        <button id="form_login_btn" >Login</button>
                        <p>or login with</p>
                        <div id="form_btn">
                          <button id="facebook_btn">Facebook</button>
                          <button id="google_btn">Google</button>
                          <button id="twiter-btn">Twitter</button>
                        </div>
                      </form>
                    ) : (
                      // Initial signup form
                      <>
                      <div id="form_1">
                        <h3>Hello!</h3>
                        <p id="form_desc">Access account and manage order</p>
                        <button  id="login_signup_btn" onClick={handleSignUpClick}>Login/Sign Up</button>
                        <hr />
                        <p>Please Login</p>
                        </div>
                      </>
                    )
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;




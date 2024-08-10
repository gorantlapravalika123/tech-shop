

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

function Footer() {
        // Function to scroll to the top of the page
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    
    return (
        <>
            <div className="footer">

                <div>
                    <h1>Tech-shop</h1>
                    <p id="desc">Subscribe to our Email alert to receive early discount offers and new products info</p>
                    <input placeholder="Email address *" id="address" ></input><br/>
                    <button  id="btn"  name="required">Subscribe</button>

                </div>


                <div>
                    <h3><b>Help</b></h3><br/>
                    <p>FAQS</p>
                    <p>Trac Order</p>
                    <p>Cancel Order</p>
                    <p>Return Order</p>
                    <p>Warranty info</p>
                </div>


                <div>
                    <h3><b>policies</b></h3><br/>
                    <p>Return policy</p>
                    <p>Security</p>
                    <p>Sitemap</p>
                    <p>Privacy policy</p>
                    <p>terms & Conditions</p>
                </div>

                <div>
                    <h3><b>Company</b></h3><br/>
                    <p>About Us</p>
                    <p>Contact Us</p>
                    <p>Service Center</p>
                    <p>Careers</p>
                    <p>Affiliates</p>
                </div>

                </div><hr></hr>

                <div className="footer_desc">
                   <p>2023|All Right Reserved.Built by|PRAVALIKA GORANTLA</p>
                <div className="footer_icons">
                      <FontAwesomeIcon icon={faFacebook} className="facebook" />
                      <FontAwesomeIcon icon={faTwitter} className="twitter" />
                     <FontAwesomeIcon icon={faInstagram} className="instagram" />
                     <FontAwesomeIcon icon={faLinkedin} className="linkedin" />
                     <FontAwesomeIcon icon={faArrowAltCircleUp} className="scroll-to-top" onClick={scrollToTop}  id="scroll_icon"/>
                 </div>

            </div>
            
        </>
    )
}
export default Footer;











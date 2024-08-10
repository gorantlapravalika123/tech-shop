import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faShieldAlt, faHandshake, faCreditCard } from '@fortawesome/free-solid-svg-icons';

function Advantages() {
    return (
        <div className='Advantages'>
            <center>
                <h1 id="advantagestitle">Our Advantages</h1>
            </center>
            <div className='advantages'>
                <div className="adavantagesicons">
                    <FontAwesomeIcon icon={faTruck} id="adavanatagesicons" />
                    <div>
                        <h3>Express Delivery</h3>
                        <p>Ships in 24 Hours</p>
                    </div>
                </div>
                <div className="adavantagesicons">
                    <FontAwesomeIcon icon={faShieldAlt} id="adavanatagesicons" />
                    <div>
                        <h3>Brand Warranty</h3>
                        <p>100% Original Products</p>
                    </div>
                </div>
                <div className="adavantagesicons">
                    <FontAwesomeIcon icon={faHandshake} id="adavanatagesicons" />
                    <div>
                        <h3>Exciting Deals</h3>
                        <p>On All Prepaid Orders</p>
                    </div>
                </div>
                <div className="adavantagesicons">
                    <FontAwesomeIcon icon={faCreditCard} id="adavanatagesicons" />
                    <div>
                        <h3>Secure Payments</h3>
                        <p>SSL/Secure Certificates</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advantages;

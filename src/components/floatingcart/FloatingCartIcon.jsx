// src/FloatingCartIcon.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./FloatingCartIcon.css"
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const FloatingCartIcon = ({ itemCount }) => {
  return (
    <div className="floating-cart-icon mt-5">
    <Link to={'/viewcart'}>
     <FontAwesomeIcon icon={faShoppingCart} color='white' size="lg"  className='p-1'/>

     {itemCount > 0 &&  <Badge bg="dark" >{itemCount}</Badge>}
     </Link>
   </div>
  );
};

export default FloatingCartIcon;

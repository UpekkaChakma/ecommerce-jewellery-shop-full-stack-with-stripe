import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <span className="icons">
        <AiFillFacebook />
        <AiFillInstagram />
        <AiOutlineTwitter />
      </span>
      <p>2022 JEWELLERY SHOP All rights reserved</p>
    </div>
  )
}

export default Footer
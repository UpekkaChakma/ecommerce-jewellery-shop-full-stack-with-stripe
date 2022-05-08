import React from 'react';
import Link from 'next/link';
import { BsHandbag } from 'react-icons/bs'
import { IoDiamondSharp } from "react-icons/io5";

import { Bag } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showBag, setShowBag, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <Link href="/">
        <p className="logo">
          <IoDiamondSharp />Jewellery Shop
        </p>
      </Link>

      <button type="button" className="bag-icon" onClick={() => setShowBag(true)}>
        <BsHandbag />
        <span className="bag-item-qty">{totalQuantities}</span>
      </button>



      {showBag && <Bag />}
    </div>
  )
}

export default Navbar
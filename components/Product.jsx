import React from 'react';
import Link from 'next/link';

import { imgUrl } from '../lib/client';

const Product = ({ product: { image, name, slug, price, discount } }) => {

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">

          {
            discount && (
              <div className="new-to-shop__div">
                <p>{discount}%  off</p>
              </div>
            )
          }

          <div className="product-img-div">
            <img
              src={imgUrl(image && image[0])}
              className="product-image"
            />
          </div>
          <div className="product-name-price-div">
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
          </div>
          {/* <div>
            <p className="product-name" style={{ height: '53px', overflow: 'hidden', padding: '10px' }}>{details}</p>
          </div> */}
        </div>
      </Link>
    </div>
  )
}

export default Product
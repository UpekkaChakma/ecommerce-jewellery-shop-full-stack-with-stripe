import React from 'react';

import { client } from '../lib/client';
import { Product, Banner } from '../components';
import { imgUrl } from '../lib/client';

const Home = ({ products, banner }) => (
  <div>

    <div className="main-banner">
      <img className="main-banner-img" src={imgUrl(banner.length && banner[0].image[0])} alt="model women with discount text" />
    </div>

    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>Choose your best and be sure to get our awesome products</p>
    </div>

    <div className="products-container">
      {products.length && products.map((product) => <Product key={product._id} product={product} />)}
    </div>

  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "jewellery"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner }
  }
}

export default Home;

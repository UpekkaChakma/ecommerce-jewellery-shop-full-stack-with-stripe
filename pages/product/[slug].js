import React, { useState, useEffect } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoIosArrowForward } from "react-icons/io";
import { client, imgUrl } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import { useRouter } from 'next/router';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, setQty, addToBag, setShowBag } = useStateContext();

  const { query } = useRouter();

  const handleBuyNow = () => {
    addToBag(product, qty);
    setShowBag(true);
  }


  useEffect(() => {
    setQty(1);
  }, [query]);

  const [accordionActive, setAccordionActive] = useState(false);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <img src={imgUrl(image && image[index])} className="product-detail-image" />
          <div className="thumbnail-images-container">
            {image.map((item, i) => (
              <img
                key={i}
                src={imgUrl(item)}
                className={i === index ? 'thumbnail-images selected-image' : 'thumbnail-images'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-div">
          <h1>{name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>({Number(3) * price} reviews)</p>
          </div>

          <div className="description-accordion-div">
            <div className="accordion-toggler-btn" onClick={() => setAccordionActive(!accordionActive)}>
              <h4>Description </h4>
              <span className={accordionActive ? 'arrow-rotate-45deg' : 'arrow-rotate-0deg '}><IoIosArrowForward /></span>
            </div>
            <p className={accordionActive ? 'accordion-active' : 'accordion-deActive'}>{details}</p>
          </div>

          <p className="price">${price}</p>

          <div className="quantity-div">
            <h4>Quantity</h4>
            <p className="quantity-plus-minus">
              <span className="minus" onClick={decQty}><AiOutlineMinusCircle /></span>
              <input type="text" value={qty} readOnly />
              <span className="plus" onClick={incQty}><AiOutlinePlusCircle /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-bag-btn" onClick={() => addToBag(product, qty)}>Add to Bag</button>
            <button type="button" className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <h2 className='suggested-products-h2'>You may also like these</h2>
      <div className="suggested-products-div">
        {products.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "jewellery"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {


  const query = `*[_type == "jewellery" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == "jewellery" && type == '${product.type}'  && slug.current != '${slug}']`
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails
import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { BsBagX } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { imgUrl } from '../lib/client';
import getStripe from '../lib/getStripe';

const Bag = () => {
    const bagRef = useRef();
    const { totalPrice, totalQuantities, bagItems, setShowBag, toggleBagItemQuantity, removeFromBag, quantity } = useStateContext();

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bagItems),
        });

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting');

        stripe.redirectToCheckout({ sessionId: data.id })
    }

    return (
        <div className="bag-wrapper" ref={bagRef}>
            <div className="bag-container">
                <div className='bag-top-part'>
                    <button
                        type="button"
                        className="bag-heading"
                        onClick={() => setShowBag(false)}>
                        <AiOutlineLeft />
                        <span className="heading">back</span>
                    </button>
                    <div>
                        <span style={{ fontSize: '15px' }}>Your Bag</span>
                        <span className="bag-num-items">({totalQuantities} {totalQuantities <= 1 ? 'item' : 'items'})</span>
                    </div>
                </div>

                {bagItems.length < 1 && (
                    <div className="empty-bag">
                        <BsBagX size={50} />
                        <h3 style={{ marginBottom: '16px' }}>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowBag(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="bag-middle-part">
                    {bagItems.length >= 1 && bagItems.map((item) => (
                        <div className="bag-product-description-remove-div" key={item._id}>
                            <div style={{ display: 'flex' }}>
                                <img src={imgUrl(item.image[0])} className="bag-product-image" />
                                <div className="bag-item-name-cost-quantity-div">
                                    <h5>{item.name}</h5>
                                    <h5>Cost ({item.quantity} {item.quantity == 1 ? 'item' : 'items'}): ${item.price * item.quantity}</h5>
                                    <p className="bag-item-quantity-change">
                                        <span className="minus" onClick={() => toggleBagItemQuantity(item._id, 'dec')}>
                                            <AiOutlineMinus />
                                        </span>
                                        <input type="text" value={item.quantity} readOnly />
                                        <span className="plus" onClick={() => toggleBagItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="remove-item"
                                onClick={() => removeFromBag(item)}
                            >
                                <TiDeleteOutline size={20} /> <span>remove</span>
                            </button>
                        </div>
                    ))}
                </div>
                {bagItems.length >= 1 && (
                    <div className="bag-bottom">
                        <div className="total">
                            <h3>Subtotal (no vat-tax): <span>${totalPrice}</span></h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={handleCheckout}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Bag
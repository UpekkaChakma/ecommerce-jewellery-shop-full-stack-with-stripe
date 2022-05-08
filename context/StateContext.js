import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {

  const [showBag, setShowBag] = useState(false);
  const [bagItems, setBagItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);



  const addToBag = (product, quantity) => {
    const checkProductInBag = bagItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInBag) {
      const updatedBagItems = bagItems.map((bagProduct) => {
        if (bagProduct._id === product._id) return {
          ...bagProduct,
          quantity: bagProduct.quantity + quantity
        };
        return bagProduct
      })

      setBagItems(updatedBagItems);
    } else {
      product.quantity = quantity;

      setBagItems([...bagItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the bag.`);
  }


  const removeFromBag = (product) => {
    const foundProduct = bagItems.find((item) => item._id === product._id);
    const newBagItems = bagItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setBagItems(newBagItems);
  }



  const toggleBagItemQuantity = (id, value) => {
    const foundProduct = bagItems.find((item) => item._id == id);

    if (value === 'inc') {
      const newBagItems = bagItems.map(item => {
        if (item._id == id) return { ...item, quantity: item.quantity + 1 };
        return item;
      });
      setBagItems(newBagItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)

    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        const newBagItems = bagItems.map(item => {
          if (item._id == id) return { ...item, quantity: item.quantity - 1 };
          return item;
        });
        setBagItems(newBagItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }



  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showBag,
        setShowBag,
        bagItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        addToBag,
        toggleBagItemQuantity,
        removeFromBag,
        setBagItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
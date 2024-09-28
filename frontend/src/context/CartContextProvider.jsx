import React, { createContext, useState } from 'react'

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    
        if (isItemInCart) {
          setCartItems(
            cartItems.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          );
        } else {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
      };

      console.log(cartItems)
    
      const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    
        if (isItemInCart.quantity === 1) {
          setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
        } else {
          setCartItems(
            cartItems.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
          );
        }
      };
    

    const clearCart = () => {
        setCartItems([]);
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
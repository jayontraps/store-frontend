import React, { createContext, useState } from "react"

import { getCart, saveCart } from "../utils/cart"

export const CartContext = createContext(null)

export default ({ children }) => {
  const [cart, setCart] = useState(getCart())
  const [isLoading, setLoading] = useState(false)

  const updateCart = (updatedCart) => {
    setCart(updatedCart)
    saveCart(updatedCart)
  }

  const removeProductFromCart = (product) => {
    setLoading(true)
    const copy = [...cart]
    const indexOfProduct = copy.findIndex(
      (alreadyInCart) => alreadyInCart.strapiId === product.strapiId
    )
    copy.splice(indexOfProduct, 1)
    updateCart(copy)
    setLoading(false)
  }

  const updateQuantity = (product, qty) => {
    setLoading(true)
    const copy = [...cart]
    const indexOfProduct = copy.findIndex(
      (alreadyInCart) => alreadyInCart.strapiId === product.strapiId
    )
    // Update the quantity
    copy[indexOfProduct].qty = parseInt(qty)

    if (copy[indexOfProduct].qty === 0) {
      // Remove the product from the cart
      copy.splice(indexOfProduct, 1)
    }

    updateCart(copy)
    setLoading(false)
  }

  const addToCart = (product, qty = 1) => {
    setLoading(true)
    const copy = [...cart]
    //If the product is already there
    const indexOfProduct = copy.findIndex(
      (alreadyInCart) => alreadyInCart.strapiId === product.strapiId
    )

    if (indexOfProduct !== -1) {
      //Update the quantity
      copy[indexOfProduct].qty += parseInt(qty)

      if (copy[indexOfProduct].qty === 0) {
        //Remove the product from the cart
        copy.splice(indexOfProduct, 1)
      }
    } else {
      //Set the qty 1
      product.qty = parseInt(qty)

      //Push the product
      copy.push(product)
    }

    updateCart(copy)
    setLoading(false)
  }

  const clearCart = () => {
    const updatedCart = []
    updateCart(updatedCart)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        updateQuantity,
        removeProductFromCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

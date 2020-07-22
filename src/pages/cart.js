import React, { useState, useCallback, useContext } from "react"
import Img from "gatsby-image"
import { CartContext } from "../context/CartContext"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Checkout from '../components/Checkout'

import {
  cartSubtotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE,
} from "../utils/cart"
import { formatPrice } from "../utils/formatPrice"

const CartPage = () => {
  const { cart, addToCart } = useContext(CartContext)
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <Layout>
      <SEO title="Cart" />
      <h2>Cart</h2>
      {cart && cart.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Img
                      style={{
                        width: "100px",
                        height: "100px",
                        verticalAlign: "middle",
                      }}
                      fluid={product.thumbnail.childImageSharp.fluid}
                    />
                    <span style={{ marginLeft: "14px", whiteSpace: "nowrap" }}>
                      {product.name}
                    </span>
                  </td>
                  <td>{formatPrice(product.price_in_cent)}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      onClick={() => {
                        addToCart(product, -1)
                      }}
                    >
                      -
                    </span>
                    {product.qty}
                    <span
                      onClick={() => {
                        addToCart(product, 1)
                      }}
                    >
                      +
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Subtotal: {formatPrice(cartSubtotal(cart))}</h3>
          {shouldPayShipping(cart) && (
            <h3>Shipping: {formatPrice(SHIPPING_RATE)}</h3>
          )}
          {!shouldPayShipping(cart) && <h3>Shipping is free!</h3>}
          <h3>Total: {formatPrice(cartTotal(cart))}</h3>
        </>
      )}

      <div>
        {cart && cart.length > 0 && (
          <button
            onClick={() => setShowCheckout(true)}
            style={{ fontSize: "24px", padding: "12px 24px" }}
          >
            Initiate Checkout
          </button>
        )}
      </div>
    </Layout>
  )
}

export default CartPage

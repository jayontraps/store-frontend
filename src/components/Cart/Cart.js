import React, { useContext } from "react"
import { animated } from "react-spring"
import CloseIcon from "@material-ui/icons/Close"
import { isMobile } from "react-device-detect"
import { CartContext } from "../../context/CartContext"
import LineItem from "./LineItem"
import StyledCart from "./StyledCart"
import { useScrollFreeze } from "../../hooks"
import LoadingSpinner from "../LoadingSpinner"
import { formatPrice } from "../../utils/formatPrice"
import { SpringLink } from "../react-spring-animation"
import {
  cartSubtotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE,
} from "../../utils/cart"

const Cart = ({ style, setCartOpen }) => {
  const { cart, isLoading } = useContext(CartContext)

  useScrollFreeze()

  return (
    <animated.div
      style={{
        zIndex: 100,
        position: "fixed",
        overflow: "auto",
        top: 0,
        right: 0,
        width: isMobile ? "100%" : "50%",
        height: "100%",
        ...style,
      }}
    >
      <StyledCart>
        <div className="cart__header">
          <h3 className="title">Your basket</h3>
        </div>
        <button
          style={{
            position: "absolute",
            backgroundColor: "transparent",
            top: "0",
            right: "0",
          }}
          className="button"
          onClick={() => setCartOpen(false)}
        >
          <CloseIcon />
        </button>

        {cart.length > 0 && (
          <>
            <div className="cart__line_items">
              {cart.map((item) => (
                <LineItem
                  key={item.id}
                  {...{
                    item,
                    isLoading,
                  }}
                />
              ))}
            </div>

            <div className="cart__footer">
              <h5 className="total__title">
                Sub Total:{" "}
                <span className="total__price">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    formatPrice(cartSubtotal(cart))
                  )}
                </span>
              </h5>

              {shouldPayShipping(cart) && (
                <h5 className="total__title">
                  Shipping:{" "}
                  <span className="total__price">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      formatPrice(SHIPPING_RATE)
                    )}
                  </span>
                </h5>
              )}
              {!shouldPayShipping(cart) && (
                <h5 className="total__title">Shipping is free!</h5>
              )}

              <h3 className="total__title">
                Total:{" "}
                <span className="total__price">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    formatPrice(cartTotal(cart))
                  )}
                </span>
              </h3>

              <div className="buy_btn_wrapper">
                <SpringLink
                  to={"/checkout"}
                  className="buy_btn button btn_icon"
                >
                  Continue to checkout
                </SpringLink>
              </div>
            </div>
          </>
        )}

        {cart.length < 1 && <p>No items in your basket</p>}
      </StyledCart>
    </animated.div>
  )
}

export default Cart

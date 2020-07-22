import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { useTransition } from "react-spring"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import MenuIcon from "@material-ui/icons/Menu"
import logo from "../../../images/logo-shapes-plus-words-2.svg"
import Cart from "../Cart/Cart"
import Nav from "../Nav"
import MobileNav from "../Nav/MobileNav"
import { CartContext } from "../../context/CartContext"
import { HeroContext } from "../../context/HeroContext"
import StyledHeader from "./styles"
import { SpringLink } from "../react-spring-animation"
import { totalItemsInCart } from "../../utils/cart"

const Header = ({ isHomePage, withHero }) => {
  const [mobileNav, setMobileNav] = useState(false)

  const [cartOpen, setCartOpen] = useState(false)

  const { cart } = useContext(CartContext)

  const { scrolledBellowHero } = useContext(HeroContext)

  const itemsInCart = totalItemsInCart(cart)

  const cartTransitions = useTransition(cartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0" },
    enter: { transform: "translate3d(0, 0, 0" },
    leave: { transform: "translate3d(100%, 0, 0" },
  })

  const mobileNavTransitions = useTransition(mobileNav, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <StyledHeader
      {...{ isHomePage, scrolledBellowHero, withHero }}
      className="header"
    >
      <div className="header__inner">
        <SpringLink to="/" className="branding__link">
          <img src={logo} alt="Level Up Logo" className="branding__logo" />
        </SpringLink>

        <Nav />
        {mobileNavTransitions.map(
          ({ item, key, props }) =>
            item && (
              <MobileNav key={key} style={props} setMobileNav={setMobileNav} />
            )
        )}
        <div className="btn_group">
          <button
            onClick={() => setMobileNav(true)}
            className="nav_toggle__btn btn_icon header_btn"
          >
            <MenuIcon />
          </button>
          <button
            className="cart_toggle__btn btn_icon header_btn"
            onClick={() => setCartOpen(true)}
          >
            {itemsInCart > 0 && (
              <div className="cart_toggle__quantity">
                <span>{itemsInCart}</span>
              </div>
            )}
            <ShoppingBasketIcon />
          </button>
        </div>

        {cartTransitions.map(
          ({ item, key, props }) =>
            item && <Cart {...{ setCartOpen }} key={key} style={props} />
        )}
      </div>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

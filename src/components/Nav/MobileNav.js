import React from "react"
import { animated } from "react-spring"
import CloseIcon from "@material-ui/icons/Close"
import { useScrollFreeze } from "../../hooks"
import StyledMobileNav from "./MobileNavStyles"
import { SpringLink } from "../react-spring-animation"
import theme from "../../theme/theme"

const { colors } = theme

const MobileNav = ({ setMobileNav, style }) => {
  useScrollFreeze()
  return (
    <animated.div
      style={{
        position: "fixed",
        zIndex: "9999",
        width: "100vw",
        height: "100vh",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.slate,
        ...style,
      }}
    >
      <StyledMobileNav>
        <button
          onClick={() => setMobileNav(false)}
          className="nav_close__btn button btn_icon"
        >
          <CloseIcon />
        </button>

        <SpringLink activeClassName="current-page" to="/">
          Home
        </SpringLink>

        <SpringLink activeClassName="current-page" to="/catalog">
          Shop
        </SpringLink>

        <SpringLink activeClassName="current-page" to="/stories">
          Stories
        </SpringLink>

        <SpringLink activeClassName="current-page" to="/contact">
          Find us
        </SpringLink>
      </StyledMobileNav>
    </animated.div>
  )
}

export default MobileNav

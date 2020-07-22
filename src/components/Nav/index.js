import React from "react"
import StyledNav from "./styles"
import { SpringLink } from "../react-spring-animation"

const Nav = () => {
  return (
    <StyledNav>
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
    </StyledNav>
  )
}

export default Nav

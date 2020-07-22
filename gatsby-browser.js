import React from "react"
import { ThemeProvider } from "emotion-theming"
import { HeroProvider } from "./src/context/HeroContext"
import CartContextProvider from "./src/context/CartContext"
import theme from "./src/theme/theme"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CartContextProvider>
      <HeroProvider>{element}</HeroProvider>
    </CartContextProvider>
  </ThemeProvider>
)

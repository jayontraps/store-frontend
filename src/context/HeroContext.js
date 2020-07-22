import React, { createContext, useState } from "react"

const defaultValues = {
  scrolledBellowHero: false,
  setScrolledBellowHero: () => {},
}

export const HeroContext = createContext(defaultValues)

export const HeroProvider = ({ children }) => {
  const [scrolledBellowHero, setScrolledBellowHero] = useState(false)
  return (
    <HeroContext.Provider
      value={{
        scrolledBellowHero,
        setScrolledBellowHero,
      }}
    >
      {children}
    </HeroContext.Provider>
  )
}

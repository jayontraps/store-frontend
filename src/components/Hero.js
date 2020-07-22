import React, { useContext, useEffect } from "react"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import { ZoomIn } from "./react-spring-animation"
import ScrollDown from "./ScrollDown"
import useIntersect from "../hooks/useIntersect"
import { HeroContext } from "../context/HeroContext"
import LargeLogo from "../components/LargeLogo"
import theme from "../theme/theme"

const {
  mq: { tabletLandscapeUp },
} = theme

const StyledHero = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: ${({ vhValue }) => vhValue}vh;
  overflow: hidden;
  &.with-tint {
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      content: "";
      display: bliock;
      /* background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.4)
      ); */
      background: radial-gradient(
        ellipse closest-side,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.4)
      );
    }
  }
`

const StyledScrollDown = styled(ScrollDown)`
  position: absolute;
  left: calc(50% - 20px);
  top: calc(${({ vhValue }) => `${vhValue}vh`} - 130px);
`

const StyledTitle = styled.div`
  position: absolute;
  width: 100%;
  bottom: 1.5rem;
  left: 0;
  z-index: 1;

  h1 {
    width: calc(100% - 2rem);
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    text-align: center;
    line-height: 1.2;
    color: white;
    font-size: 3rem;
    ${tabletLandscapeUp} {
      text-align: left;
    }
  }
`

const HeroFrameObserved = styled.div`
  width: 100vw;
  height: ${({ vhValue }) => `${vhValue}vh`};
  background-color: transparent;
  position: relative;
  z-index: -1;
`

const isBrowser = typeof window !== "undefined"

const Hero = ({ image, vhValue = 94, title, isHomePage = false }) => {
  const { setScrolledBellowHero } = useContext(HeroContext)

  const [ref, entry] = useIntersect({})

  useEffect(() => {
    setScrolledBellowHero(!entry.isIntersecting)
  }, [entry])

  function scrollToContent() {
    if (isBrowser) {
      const theFold = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )
      const offSet = 110

      window.scrollTo({
        top: theFold - offSet,
        behavior: "smooth",
      })
    }
  }

  const showScrollDown = vhValue > 80

  return (
    <>
      <StyledHero className={title ? "with-tint" : ""} {...{ vhValue }}>
        <ZoomIn>
          <Img
            backgroundColor
            fluid={image}
            objectFit="cover"
            objectPosition="50% 50%"
            style={{
              height: `${vhValue}vh`,
            }}
          />
        </ZoomIn>
        {showScrollDown && (
          <StyledScrollDown {...{ vhValue }} onClick={scrollToContent} />
        )}
        {isHomePage && <LargeLogo />}
        {title && !isHomePage && (
          <StyledTitle>
            <h1>{title}</h1>
          </StyledTitle>
        )}
      </StyledHero>
      <HeroFrameObserved {...{ vhValue }} ref={ref} />
    </>
  )
}

export default Hero

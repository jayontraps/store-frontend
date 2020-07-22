import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { isBrowser } from "react-device-detect"
import { Transition, animated } from "react-spring/renderprops"
import { useKeyPress } from "../hooks"
import Icon from "./Icon"

/* eslint-disable */

const Container = styled("div")`
  width: 100%;
  height: 94vh;
  /* height: 0; */
  /* padding-bottom: 66.66%; */
  overflow: hidden;
  margin: 0 auto;
  position: relative;

  & > div {
    will-change: transform, opacity;
    position: absolute;
    width: 100%;
  }

  button {
    appearance: none;
    border: none;
    border-radius: 0;
    outline: 0;
    background-color: transparent;
    color: white;
    position: absolute;
    top: calc(50% - 1rem);
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      display: block;
      width: 100%;
      height: 100%;
      stroke: white;
      stroke-width: 10px;
      fill: none;
      &:hover {
        cursor: pointer;
      }
    }
    &.next {
      right: 3%;
    }
    &.prev {
      left: 3%;
    }
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      color: #c3c3c3;
    }
  }
`

const SliderNav = styled("ul")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 2rem;
  margin: 0;
  padding: 0;
  li {
    display: block;
    background-color: rgba(255, 255, 255, 0.5);
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 1rem;
    &.active {
      background-color: rgba(255, 255, 255, 0.8);
    }
    &:hover {
      cursor: pointer;
    }
  }
`

const FORWARD = "forward"
const BACKWARD = "backward"

const Slider = ({ items, bullets = false }) => {
  const [direction, setDirection] = useState("init")
  const [index, setIndex] = useState(0)
  const ArrowRight = useKeyPress("ArrowRight")
  const ArrowLeft = useKeyPress("ArrowLeft")

  function move(e, dir) {
    e.preventDefault()
    if (dir === "next") {
      setDirection(FORWARD)
      setIndex(index === items.length - 1 ? 0 : index + 1)
    } else {
      setDirection(BACKWARD)
      setIndex(index > 0 ? index - 1 : 0)
    }
  }

  function handleNavClick(i) {
    if (i === index) return false
    setDirection(i < index ? BACKWARD : FORWARD)
    setIndex(i)
  }

  useEffect(() => {
    if (ArrowLeft) {
      const newIndex = index > 0 ? index - 1 : 0
      setDirection(BACKWARD)
      setIndex(newIndex)
    }
    if (ArrowRight) {
      const newIndex = index === items.length - 1 ? index : index + 1
      setDirection(FORWARD)
      setIndex(newIndex)
    }
  }, [ArrowRight, ArrowLeft])

  return (
    <Container className="slider">
      <Transition
        native
        reset
        unique
        items={index}
        from={{
          opacity: 0.5,
          // transform:
          //   direction === "init"
          //     ? "translate3d(0%, 0, 0)"
          //     : direction === FORWARD
          //     ? "translate3d(50%, 0 ,0)"
          //     : "translate3d(-50%, 0 ,0)",
        }}
        enter={{
          opacity: 1,
          transform: "translate3d(0%, 0, 0)",
        }}
        leave={{
          opacity: 0.5,
          // transform:
          //   direction === FORWARD
          //     ? "translate3d(-25%, 0, 0)"
          //     : "translate3d(+25%, 0, 0)",
        }}
        // config={{
        //   duration: 8000,
        //   // easing: easings.easeCubicOut,
        // }}
      >
        {(index) => (style) => (
          <animated.div style={{ ...style }}>{items[index]}</animated.div>
        )}
      </Transition>

      <button
        className="slider_nav_icons prev"
        disabled={index === 0}
        onClick={(e) => move(e, "prev")}
      >
        {/* <ArrowBackIosIcon /> */}
        <Icon name="arrow-prev" />
      </button>
      <button
        className="slider_nav_icons next"
        disabled={index === items.length - 1}
        onClick={(e) => move(e, "next")}
      >
        {/* <ArrowForwardIosIcon /> */}
        <Icon name="arrow-next" />
      </button>
      {isBrowser && bullets && (
        <SliderNav>
          {items.map((screen, i) => {
            const className = i === index ? "active" : ""
            return (
              <li
                {...{ className }}
                key={`slider-nav-${i}`}
                onClick={() => handleNavClick(i)}
              />
            )
          })}
        </SliderNav>
      )}
    </Container>
  )
}

export default Slider
/* eslint-enable */

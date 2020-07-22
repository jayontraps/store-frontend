import React, { useState, useRef, useEffect } from "react"
import styled from "@emotion/styled"
import { animated, useTransition } from "react-spring"
import { isMobile } from "react-device-detect"
import CloseIcon from "@material-ui/icons/Close"
import getTransitionEndEventName from "../utils/getTransitionEndEventName"

const scaleValue = isMobile ? "1" : "1.2"

const StyledStoryCard = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  transition: all 500ms ease;
  cursor: pointer;

  > div {
    /* Front & Back */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    color: $color-text;
    background-color: #fff;
    transition: all 500ms ease;
  }

  .Card__front--tint {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.9;
    transition: all 500ms ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }

    &.on {
      background-color: rgba(255, 255, 255, 0.7);
    }

    &.highlight {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }

  .Card__front--title {
    display: inline-block;
    text-align: right;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    color: $white;
    font-weight: bold;
    z-index: 10;
    opacity: 1;
    transition: all 500ms ease;
  }

  .Card__closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    z-index: 11;
    color: white;
    &:hover {
      cursor: pointer;
    }
  }

  .Card__content {
    margin: 0;
    text-align: left;
    color: $white;
    opacity: 0;
    transition: all 2s ease;
    width: 80%;
    color: white;
  }

  .Card__back {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Card__content__heading {
    margin-bottom: 1.25rem;
    font-weight: 100;
  }

  .Card__content__text {
    p {
      margin-bottom: 0.75rem;
    }
  }

  .Card__front {
    &:hover {
      .Card__front--title {
        color: $color-text;
        font-weight: bold;
      }
    }
  }

  /* Animation states */

  div {
    backface-visibility: hidden;
  }

  .Card__front {
    color: #fff;
    transform: perspective(800px) rotateY(0deg);
  }

  .Card__back {
    transform: perspective(800px) rotateY(-179.9deg);
  }

  &.moveToCenter {
    .Card__front {
      transform: perspective(800px) rotateY(179.9deg) scale(${scaleValue});
    }

    .Card__back {
      transform: perspective(800px) rotateY(0deg) scale(${scaleValue});
    }
  }

  &.return {
    .Card__front {
      transform: perspective(800px) rotateY(0deg) scale(1);
    }

    .Card__back {
      transform: perspective(800px) rotateY(-179.9deg) scale(1);
    }
  }

  &.flipped {
    z-index: 9;

    .Card__content {
      opacity: 1;
    }

    .Card__front--tint {
      opacity: 0;
    }

    .Card__front--title {
      opacity: 0;
    }
  }

  ${({ styles }) => ({ ...styles })}
`

const Overlay = ({ style }) => (
  <animated.div
    style={{
      position: "fixed",
      zIndex: "3",
      width: "100vw",
      height: "100vh",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(2px)",
      ...style,
    }}
  ></animated.div>
)

const StoryCard = ({ card }) => {
  const { heading, label, text } = card
  const TextComponent = text
  const isClient = typeof document !== undefined
  const [isFlipped, setIsFlipped] = useState(false)
  const [isClosed, setIsClosed] = useState(true)
  const [transformValue, setTransformValue] = useState(null)
  const cardRef = useRef(null)
  let transitionEndEventName = getTransitionEndEventName()
  const overlayTransitions = useTransition(isFlipped, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function closeFlipped(e) {
    if (e.propertyName === "transform" && !isFlipped) {
      setIsClosed(true)
    }
  }

  useEffect(() => {
    cardRef.current.addEventListener(transitionEndEventName, closeFlipped)
    return () => {
      cardRef.current.removeEventListener(transitionEndEventName, closeFlipped)
    }
  }, [isFlipped, closeFlipped])

  function flip(e) {
    e.stopPropagation()
    if (isFlipped) {
      close(e)
      return null
    }

    if (isClient) {
      setIsFlipped(true)
      setIsClosed(false)
      const rect = cardRef.current.getBoundingClientRect()
      const card = {
        x: rect.left,
        y: rect.top,
        w: rect.right - rect.left,
        h: rect.bottom - rect.top,
      }
      const doc = {
        x: document.documentElement.clientWidth / 2,
        y: document.documentElement.clientHeight / 2,
      }
      const leftTarget = doc.x - (card.x + card.w / 2)
      let topTarget = doc.y - (card.y + card.h / 2)
      // prevent flipper card from getting too high and disapearing behind the header
      if (doc.y < 320) {
        topTarget = 320 - (card.y + card.h / 2)
      }
      setTransformValue(`translate(${leftTarget}px, ${topTarget}px)`)
    }
  }

  function close(e) {
    e.stopPropagation()
    setTransformValue(`translate(0px, 0px)`)
    setIsFlipped(false)
  }

  const statusClasses = isFlipped
    ? "moveToCenter flipped"
    : isClosed
    ? ""
    : "return flipped"

  return (
    <>
      <StyledStoryCard
        styles={{ transform: transformValue }}
        className={statusClasses}
        ref={cardRef}
        onClick={(e) => flip(e)}
      >
        <div className="Card__back">
          <div className="Card__closeBtn">
            <CloseIcon />
          </div>

          <div className="Card__content">
            <h2 className="Card__content__heading">{heading}</h2>

            <div className="Card__content__text">
              <TextComponent />
            </div>
          </div>
        </div>

        <div className="Card__front">
          <div className="Card__front--title">{label}</div>
          <div className="Card__front--tint"></div>
        </div>
      </StyledStoryCard>
      {overlayTransitions.map(
        ({ item, key, props }) => item && <Overlay key={key} style={props} />
      )}
    </>
  )
}

export default StoryCard

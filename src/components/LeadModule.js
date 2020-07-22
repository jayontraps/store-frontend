import React from "react"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import useIsInViewport from "use-is-in-viewport"
import theme from "../theme/theme"

const {
  mq: { tabletLandscapeUp },
} = theme

const StyledLeadModule = styled.div`
  margin: ${({ theme }) => theme.spacing.section} auto;
  width: 90%;
  max-width: ${({ theme }) => theme.layout.leaderWidth};

  ${tabletLandscapeUp} {
    display: grid;
    grid-gap: ${({ theme }) => theme.spacing.gridGap};
    grid-template-columns: 1fr 1fr;
    .leader__image,
    .leader__content {
    }
    .leader__image {
    }
    .leader__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .leader__image,
  .leader__content {
    &.hidden,
    &.visible {
      transition: opacity 500ms ease-in;
      will-change: opacity;
      opacity: 0;
    }

    &.visible {
      opacity: 1;
    }
  }

  h1 {
    max-width: 500px;
    line-height: 1.2em;
    font-size: 2.5rem;
    margin: 2rem auto;
    ${tabletLandscapeUp} {
      margin: 0 0 2rem 0;
    }
  }

  p {
    max-width: 450px;
    padding-left: 2rem;
    border-left: 2px solid ${({ theme }) => theme.colors.slate};
  }
`

const LeadModule = ({ image, title, intro }) => {
  const [isInViewport, leaderEl] = useIsInViewport({
    modTop: "100px",
  })

  return (
    <StyledLeadModule>
      <div
        ref={leaderEl}
        className={`leader__image ${isInViewport ? "visible" : "hidden"}`}
      >
        <Img
          backgroundColor
          fluid={image}
          objectFit="cover"
          objectPosition="50% 50%"
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className={`leader__content ${isInViewport ? "visible" : "hidden"}`}>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </StyledLeadModule>
  )
}

export default LeadModule

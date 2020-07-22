import React from "react"
import styled from "@emotion/styled"
import useIsInViewport from "use-is-in-viewport"
import Img from "gatsby-image"
import { SpringLink } from "./react-spring-animation"
import theme from "../theme/theme"

const {
  mq: { tabletLandscapeUp },
} = theme

const CollectionCard = ({ collection, className, delay = 0 }) => {
  const { slug, title, image } = collection
  const [cardInView, card] = useIsInViewport()
  const cardInViewClass = cardInView ? "visible" : "hidden"
  return (
    <SpringLink
      ref={card}
      to={`/range/${slug}`}
      className={`${className} ${cardInViewClass}`}
    >
      <Img
        backgroundColor
        fluid={image.childImageSharp.fluid}
        objectFit="cover"
        objectPosition="50% 50%"
      />

      <div className="item_title">{title}</div>
    </SpringLink>
  )
}

const StyledCard = styled(CollectionCard)`
  &.hidden,
  &.visible {
    transition: opacity ${({ theme }) => theme.animation.duration} ${({
  theme,
}) => theme.animation.easing}, transform ${({ theme }) =>
  theme.animation.duration} ${({ theme }) => theme.animation.easing};
    transition-delay: ${({ delay }) => delay}ms;
    will-change: opacity;
    opacity: 0;
    /* transform: ${({ withTranslate }) =>
      withTranslate ? "translateY(150px)" : "translateY(0px)"}; */
  }
  &.visible {
    opacity: 1;
    transform: translateY(0px);
  }

  text-decoration: none;
  display: block;
  margin-bottom: 3rem; 
  
  .item_title {
    color: ${({ theme }) => theme.colors.primary};
    display: inline-block;    
    
    font-size: 1.5rem;
    text-decoration: none;
    margin-top: .5rem;

    ${tabletLandscapeUp} {
      justify-content: center;
      align-items: center;
      text-align: center;
      position: absolute;      
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 20px 10px;
      color: white;
      z-index: 1;
    }
  }

  ${tabletLandscapeUp} {
    margin-bottom: 0;    
    position: relative;
    
    
    &::after {      
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;      
      background: 
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.4)
      );
    }

    &:hover {
      &::after {        
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0.4)
        );
      }
    }
    .gatsby-image-wrapper {
      height: 100%;
      min-height: 300px;
      max-height: 400px;          
    }
  }
`

export default StyledCard

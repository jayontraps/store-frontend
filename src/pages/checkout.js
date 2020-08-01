import React, { useState, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import { useTransition, animated } from "react-spring"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ZoomIn } from "../components/react-spring-animation"
import { CartContext } from "../context/CartContext"
import Checkout from "../components/Checkout"

const StyledContent = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    position: absolute;
    z-index: 9;
    top: 50%;
    left: 50%;
    width: ${({ theme }) => theme.layout.innerWidth};
    min-height: 40vh;
    background-color: ${({ theme }) => theme.colors.bgColor};
    padding: 2rem;
    will-change: transform;
    .line-item__img {
      max-width: 80px;
    }
    h5 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }
`

const Content = () => {
  const { cart, isLoading } = useContext(CartContext)
  const [showForm, setShowForm] = useState(true)
  const transitions = useTransition(showForm, null, {
    from: { opacity: 0, transform: "translate(-50%, -50%) scale(0.85)" },
    enter: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
    leave: { opacity: 0, transform: "translate(-50%, -50%) scale(0.85)" },
  })

  return (
    <>
      <StyledContent>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                className="container content__events"
              >
                {cart.length > 0 ? (
                  <Checkout cart={cart} />
                ) : (
                  <h2>There are no items in your basket.</h2>
                )}
              </animated.div>
            )
        )}
      </StyledContent>
    </>
  )
}

const CheckoutPage = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "images-full-screen-1.jpg" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <Layout withHero>
      <SEO title="Thank you" />
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <ZoomIn>
          <Img
            fluid={image.sharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            style={{
              height: "100vh",
            }}
          />
        </ZoomIn>
      </div>

      <Content />
    </Layout>
  )
}

export default CheckoutPage

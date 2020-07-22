import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import { useTransition, animated } from "react-spring"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ZoomIn } from "../components/react-spring-animation"

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
    width: 650px;
    min-height: 40vh;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform-origin: center center;
    will-change: transform;
    .close_panel {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }
`

const Content = () => {
  const [showForm, setShowForm] = useState(true)
  const transitions = useTransition(showForm, null, {
    from: { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
    enter: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
    leave: { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
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
                <h1>Thank you!</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid sit repudiandae facilis voluptatum mollitia porro
                  ipsam animi deserunt quidem asperiores! Nobis iste aliquid,
                  molestiae rerum quaerat nisi ab libero possimus.
                </p>
              </animated.div>
            )
        )}
      </StyledContent>
    </>
  )
}

const Thanks = () => {
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
          height: "94vh",
          overflow: "hidden",
        }}
      >
        <ZoomIn>
          <Img
            fluid={image.sharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            style={{
              height: "94vh",
            }}
          />
        </ZoomIn>
      </div>

      <Content />
    </Layout>
  )
}

export default Thanks

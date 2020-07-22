import React from "react"
import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
import { ZoomIn } from "../components/react-spring-animation"

const StyledContainer = styled.div`
  .container > div > div {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
  }

  .text {
    pointer-events: none;
  }

  .block1 {
    width: 70%;
    height: 75%;

    background-color: gainsboro;
  }

  .block2 {
    background-color: #20232f;
    width: 50%;
    height: 60%;
  }

  .block3 {
    width: 30%;
    height: 60%;
    justify-content: flex-start !important;
  }

  .block1,
  .block2,
  .block3 {
    cursor: pointer;
  }

  .pink {
    background: linear-gradient(to right, deeppink 0%, coral 100%);
  }

  .teal {
    background: linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%);
  }

  .tomato {
    background: linear-gradient(to right, tomato 0%, gold 100%);
  }
`

const Image = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "images-full-screen-4.jpg" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <ZoomIn>
      <Img
        backgroundColor
        fluid={image.sharp.fluid}
        style={{
          height: "100vh",
        }}
        objectFit="cover"
        objectPosition="50% 50%"
      />
    </ZoomIn>
  )
}

const Page = ({ offset, gradient, onClick }) => (
  <>
    <ParallaxLayer offset={offset} speed={0.1} onClick={onClick}>
      <div className="block1"></div>
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.3} onClick={onClick}>
      <div className={`block2`}></div>
    </ParallaxLayer>

    <ParallaxLayer className="text number" offset={offset} speed={0.6}>
      <div className={`block3 ${gradient}`}></div>
    </ParallaxLayer>
  </>
)

export default class extends React.Component {
  scroll = (to) => this.parallax.scrollTo(to)
  render() {
    return (
      <Layout>
        {/* <div
          className="test-hero"
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: "rebeccapurple",
            width: "100vw",
            height: "100vh",
            overflow: "auto",
          }}
        ></div> */}
        <StyledContainer>
          <Parallax
            className="container"
            ref={(node) => (this.parallax = node)}
            pages={4}
          >
            <ParallaxLayer
              style={{
                zIndex: 100,
                backgroundColor: "rebeccapurple",
                width: "100vw",
                height: "100vh",
              }}
              offset={0}
              speed={1}
            >
              <Image />
            </ParallaxLayer>

            <Page offset={1} gradient="pink" onClick={() => this.scroll(2)} />
            <Page offset={2} gradient="teal" onClick={() => this.scroll(3)} />
            <Page offset={3} gradient="tomato" onClick={() => this.scroll(1)} />
          </Parallax>
        </StyledContainer>
      </Layout>
    )
  }
}

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ZoomIn } from "../components/react-spring-animation"

const StyledContainer = styled.div`
  .flex-layer {
    /* display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center; */
  }

  .text {
    pointer-events: none;
  }

  .block1 {
    width: 100%;
    height: 150vh;
    background-color: gainsboro;
  }

  .block2 {
    background-color: #20232f;
    width: 50%;
    height: 100%;
  }

  .block3 {
    width: 30%;
    height: 100%;
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

const Page = ({ offset, gradient, onClick }) => (
  <>
    <ParallaxLayer
      className="flex-layer"
      offset={offset}
      speed={0.1}
      onClick={onClick}
    >
      <div className="block1"></div>
    </ParallaxLayer>

    <ParallaxLayer
      className="flex-layer"
      offset={offset}
      speed={0.3}
      onClick={onClick}
    >
      <div className={`block2`}></div>
    </ParallaxLayer>

    <ParallaxLayer
      className="flex-layer text number"
      offset={offset}
      speed={0.6}
    >
      <div className={`block3 ${gradient}`}></div>
    </ParallaxLayer>
  </>
)

const Image = () => {
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
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "94vh",
      }}
    >
      <ZoomIn>
        <Img
          backgroundColor
          fluid={image.sharp.fluid}
          style={{
            height: "94vh",
          }}
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </ZoomIn>
    </div>
  )
}

export default class extends React.Component {
  scroll = (to) => this.parallax.scrollTo(to)
  render() {
    return (
      <Layout>
        <SEO title="Test" />
        <StyledContainer>
          <Image />
          <Parallax
            className="container"
            ref={(node) => (this.parallax = node)}
            pages={4}
          >
            <ParallaxLayer
              onClick={() => this.scroll(1)}
              offset={0}
              style={{
                backgroundColor: "transparent",
              }}
            >
              {/* <Image /> */}
            </ParallaxLayer>
            <Page offset={1} gradient="pink" onClick={() => this.scroll(2)} />
            <Page offset={2} gradient="teal" onClick={() => this.scroll(3)} />
            <Page offset={3} gradient="tomato" onClick={() => this.scroll(0)} />
          </Parallax>
        </StyledContainer>
      </Layout>
    )
  }
}

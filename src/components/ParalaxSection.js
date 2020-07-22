import React from "react"
// import styled from "@emotion/styled"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { ZoomIn } from "./react-spring-animation"
import LeadModule from "./LeadModule"

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

class ParalaxSection extends React.Component {
  scroll = (to) => this.parallax.scrollTo(0.35)
  render() {
    return (
      <Parallax ref={(ref) => (this.parallax = ref)} pages={2}>
        <ParallaxLayer
          offset={0}
          speed={1.5}
          style={{
            zIndex: 100,
            height: "100vh",
            backgroundColor: "gainsboro",
          }}
          onClick={() => this.scroll(1)}
        >
          <Image />
        </ParallaxLayer>
        <ParallaxLayer className="lead" offset={0.75} speed={1}>
          <LeadModule />
        </ParallaxLayer>
      </Parallax>
    )
  }
}

export default ParalaxSection

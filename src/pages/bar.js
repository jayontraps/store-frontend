import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ZoomIn } from "../components/react-spring-animation"
import StyledContainer from "./storeStyles"
import { SpringLink } from "../components/react-spring-animation"
import LeadModule from "../components/LeadModule"
import Slider from "../components/Slider"
import ScrollDown from "../components/ScrollDown"

const sliderImages = [
  "images-full-screen-1.jpg",
  "images-full-screen-5.jpg",
  "images-full-screen-6.jpg",
  "teacup-full-screen-compressor.jpg",
]

const ImageDiv = styled("div")`
  width: 100%;
  padding-bottom: 66.66%;
  background-size: cover;
`

const items = sliderImages.map((img) => (
  <ImageDiv
    style={{
      backgroundImage: `url(/img/${img})`,
    }}
  />
))

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
  )
}

const Item = ({ to, title, image }) => (
  <SpringLink to={`/${to}`} className="item">
    <div className="item_image"></div>
    <div className="item_title">{title}</div>
  </SpringLink>
)

export default class extends React.Component {
  scroll = (to) => this.parallax.scrollTo(to)
  render() {
    return (
      <Layout>
        <SEO title="Test" />
        <StyledContainer>
          <Image />
          <Parallax
            id="parallax_container"
            className="container"
            ref={(node) => (this.parallax = node)}
            pages={4}
          >
            {/* Page */}
            <ParallaxLayer offset={0}>
              <ScrollDown />
              {/* <span className="scroll_down">
                <ExpandMoreIcon onClick={() => this.scroll(1)} />
              </span> */}
            </ParallaxLayer>

            {/* Page */}
            <ParallaxLayer offset={1}>
              <div className="background_page"></div>
            </ParallaxLayer>

            <div className="wrapper">
              <ParallaxLayer
                offset={1.05}
                speed={0.23}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "canter",
                  flexDirection: "column",
                  marginLeft: "16.66%",
                  width: "66.66%",
                  paddingTop: "2rem",
                }}
              >
                <LeadModule />
                <Slider items={items} />
              </ParallaxLayer>
            </div>

            {/* Page */}
            <ParallaxLayer offset={2}>
              <div className="background_page"></div>
            </ParallaxLayer>

            <div className="wrapper">
              {/* row of 2 */}
              <ParallaxLayer
                offset={2.05}
                speed={0.2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "16.66%",
                  width: "33.33%",
                }}
              >
                <Item to="cork-map-coasters" title="Cork Coasters" />
              </ParallaxLayer>
              <ParallaxLayer
                offset={2.05}
                speed={0.1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "50%",
                  width: "33.33%",
                }}
              >
                <Item to="cork-map-placemats" title="Cork Placemats" />
              </ParallaxLayer>

              {/* row of 3 */}
              <ParallaxLayer
                offset={2.55}
                speed={0.3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: 0,
                  width: "33.33%",
                }}
              >
                <Item to="ply-map-coasters" title="Ply Map Coasters" />
              </ParallaxLayer>
              <ParallaxLayer
                offset={2.55}
                speed={0.2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "33.33%",
                  width: "33.33%",
                }}
              >
                <Item to="ply-map-placemats" title="Ply Map Placemats" />
              </ParallaxLayer>
              <ParallaxLayer
                offset={2.55}
                speed={0.1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "66.66%",
                  width: "33.33%",
                }}
              >
                <Item
                  to="miscellaneous-ply-coasters"
                  title="Miscellaneous Ply"
                />
              </ParallaxLayer>
            </div>

            {/* Page */}
            <ParallaxLayer offset={3}>
              <div className="background_page"></div>
            </ParallaxLayer>

            <div className="wrapper">
              <ParallaxLayer
                offset={3}
                speed={0.2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "canter",
                  marginLeft: "16.66%",
                  width: "66.66%",
                  backgroundColor: "gainsboro",
                }}
              >
                <h1>Page</h1>
              </ParallaxLayer>
            </div>
          </Parallax>
        </StyledContainer>
      </Layout>
    )
  }
}

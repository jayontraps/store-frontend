import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { BrowserView, MobileView } from "react-device-detect"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ZoomIn } from "../components/react-spring-animation"
import StyledContainer from "./storeStyles"
import { SpringLink } from "../components/react-spring-animation"

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
      <Layout withHero>
        <SEO title="Test" />
        <StyledContainer>
          <Image />
          <BrowserView>
            <Parallax
              className="container"
              ref={(node) => (this.parallax = node)}
              pages={2}
            >
              <ParallaxLayer offset={0}>
                <span className="scroll_down">
                  <ExpandMoreIcon onClick={() => this.scroll(1)} />
                </span>
              </ParallaxLayer>

              <ParallaxLayer offset={1}>
                <div className="background_page"></div>
              </ParallaxLayer>

              <div className="wrapper">
                <ParallaxLayer
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "16.66%",
                    width: "33.33%",
                  }}
                  offset={1.1}
                  speed={1}
                >
                  <Item to="cork-map-coasters" title="Cork Coasters" />
                </ParallaxLayer>

                <ParallaxLayer
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "50%",
                    width: "33.33%",
                  }}
                  offset={1.1}
                  speed={0.5}
                >
                  <Item to="cork-map-placemats" title="Cork Placemats" />
                </ParallaxLayer>

                <ParallaxLayer
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 0,
                    width: "33.33%",
                  }}
                  offset={1.6}
                  speed={2}
                >
                  <Item to="ply-map-coasters" title="Ply Map Coasters" />
                </ParallaxLayer>
                <ParallaxLayer
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "33.33%",
                    width: "33.33%",
                  }}
                  offset={1.6}
                  speed={1.5}
                >
                  <Item to="ply-map-placemats" title="Ply Map Placemats" />
                </ParallaxLayer>
                <ParallaxLayer
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "66.66%",
                    width: "33.33%",
                  }}
                  offset={1.6}
                  speed={1}
                >
                  <Item
                    to="miscellaneous-ply-coasters"
                    title="Miscellaneous Ply"
                  />
                </ParallaxLayer>
              </div>
            </Parallax>
          </BrowserView>
          <MobileView>
            <h1>This is the mobile</h1>
          </MobileView>
        </StyledContainer>
      </Layout>
    )
  }
}

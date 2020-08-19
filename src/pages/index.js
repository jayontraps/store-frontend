import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import { isMobile } from "react-device-detect"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Collections from "../components/Collections"
import Hero from "../components/Hero"
import LeadModule from "../components/LeadModule"

const vhValue = isMobile ? 80 : 94

const Container = styled.div`
  min-height: 100vh;
  overflow-y: hidden;
  width: 100vw;
  position: relative;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.bgColor};
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "images-full-screen-4.jpg" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      image2: file(relativePath: { eq: "images-full-screen-6-cropped.png" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <Layout withHero isHomePage>
      <SEO title="Home" />
      <Hero isHomePage {...{ vhValue }} image={data.image1.sharp.fluid} />
      <Container>
        <LeadModule
          image={data.image2.sharp.fluid}
          title="Vintage map plywood and cork coasters and table mats"
          intro="Unique homeware gifts made in the UK. Choose from FSC Plywood coasters handmade from original recycled maps and discarded books or printed cork matching sets."
        />
        <Collections />
      </Container>
    </Layout>
  )
}

export default IndexPage

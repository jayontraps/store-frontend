import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/Hero"

const Container = styled.div`
  min-height: 50vh;
  overflow-y: hidden;
  width: 100vw;
  position: relative;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.bgColor};
`

const StyledContent = styled.div`
  width: 95%;
  max-width: ${({ theme }) => theme.layout.innerWidth};
  margin: 2rem auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bgColor};
  p,
  h1 {
    margin-bottom: 1rem;
  }
  a,
  a::visited {
    color: ${({ theme }) => theme.colors.active};
  }
`
const About = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "LockdownProject.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  console.log(data)

  return (
    <Layout withHero>
      <SEO title="About us" />
      <Hero vhValue={80} image={data.file.childImageSharp.fluid} />
      <Container>
        <StyledContent>
          <h1>About us</h1>
          <p>
            Ply Coasters was conceived by Louise Kamara, who makes the plywood
            part of the collection by hand in her London studio.
          </p>
          <p>
            Louise is a keen collector of maps and also holds a personal and
            professional interest in reuse of materials and sustainable design.
            She set up the forward-thinking Eco Design Fair in 2004 and went on
            to curate events for the Barbican, Southbank Centre and Hemingway
            Design. She now runs sustainable and local food and design events at
            &nbsp;
            <a
              href="https://www.horniman.ac.uk/"
              target="_blank"
              rel="noreferrer"
            >
              The Horniman Museum and Gardens
            </a>
            .
          </p>
        </StyledContent>
      </Container>
    </Layout>
  )
}

export default About

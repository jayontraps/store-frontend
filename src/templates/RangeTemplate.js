import React from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProductGrid from "../components/ProductsListing/ProductGrid"
import theme from "../theme/theme"
import SEO from "../components/seo"
import Hero from "../components/Hero"

const {
  mq: { tabletLandscapeUp },
} = theme

const vhValue = 66.66

const Container = styled.div`
  min-height: 80vh;
  overflow-y: hidden;
  width: 100vw;
  position: relative;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.bgColor};
  .product-grid {
    padding: ${({ theme }) => theme.spacing.gridGap} 0;
    ${tabletLandscapeUp} {
      padding: ${({ theme }) => theme.spacing.section} 0;
    }
    width: calc(100% - 2rem);
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.maxWidth};
  }
`

const RangeTemplate = ({ data }) => {
  const { strapiRange } = data
  const {
    products,
    title,
    description,
    image: {
      childImageSharp: { fluid },
    },
  } = strapiRange

  return (
    <Layout withHero>
      <SEO title={title} />
      <Hero
        {...{ vhValue }}
        title={title}
        description={description}
        image={fluid}
      />

      <Container>
        <ProductGrid products={products} />
      </Container>
    </Layout>
  )
}

export default RangeTemplate

export const query = graphql`
  query($slug: String!) {
    strapiRange(slug: { eq: $slug }) {
      title
      description
      image {
        childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      products {
        id
        name
        description
        price
        slug
        number_in_set
        itemType
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 550) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

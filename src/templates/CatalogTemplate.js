import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProductList from "../components/ProductsListing/ProductList"
import SEO from "../components/seo"

const CatalogTemplate = ({ data }) => {
  const { strapiRange } = data
  return (
    <Layout>
      <SEO title={strapiRange.title} />
      <ProductList title={strapiRange.title} products={strapiRange.products} />
    </Layout>
  )
}

export default CatalogTemplate

export const query = graphql`
  query($slug: String!) {
    strapiRange(slug: { eq: $slug }) {
      title
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
        slug
        description
        price
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        images {
          id
          imageFile {
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`

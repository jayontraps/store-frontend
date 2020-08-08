import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProductList from "../components/ProductsListing/ProductList"
import SEO from "../components/seo"

const CatalogTemplate = ({ data }) => {
  const { strapiRange } = data
  return (
    <Layout bgColor="dark">
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
      products {
        id
        name
        slug
        description
        price
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

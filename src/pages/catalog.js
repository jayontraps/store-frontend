import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import ProductList from "../components/ProductsListing/ProductList"

const Catalog = () => {
  const data = useStaticQuery(graphql`
    query {
      products: allStrapiProduct(sort: { order: ASC, fields: updated_at }) {
        nodes {
          id
          name
          price
          slug
          description
          thumbnail {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  const prods = data.products.nodes.map((prod) => prod)

  return (
    <Layout bgColor="dark">
      <ProductList title="All Coasters" products={prods} />
    </Layout>
  )
}

export default Catalog

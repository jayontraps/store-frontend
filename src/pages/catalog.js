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
  `)

  const prods = data.products.nodes.map((prod) => prod)

  return (
    <Layout bgColor="dark">
      <ProductList title="All Coasters and Placemats" products={prods} />
    </Layout>
  )
}

export default Catalog

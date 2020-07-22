import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { fromProductSlugToUrl } from "../utils/fromProductSlugToUrl"

const strapi = ({ data }) => {
  const { allStrapiProduct } = data
  console.log(allStrapiProduct.nodes)
  return (
    <Layout>
      {allStrapiProduct.nodes.map((prod) => (
        <Link to={fromProductSlugToUrl(prod.slug)} key={prod.price}>
          {prod.name}
        </Link>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allStrapiProduct {
      nodes {
        name
        price
        slug
        description
        images {
          imageFile {
            id
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
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
`

export default strapi

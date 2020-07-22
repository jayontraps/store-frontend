import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { SpringLink } from "../react-spring-animation"

const CatalogLinks = ({ className }) => {
  const { allStrapiRange } = useStaticQuery(graphql`
    query {
      allStrapiRange {
        nodes {
          title
          slug
          id
          strapiId
        }
      }
    }
  `)
  return allStrapiRange.nodes.length > 0 ? (
    <nav {...{ className }}>
      <ul>
        <li>
          <SpringLink to={`/catalog`}>All Coasters</SpringLink>
        </li>
        {allStrapiRange.nodes.map((range) => (
          <li key={range.id}>
            <SpringLink to={`/catalog/${range.slug}`}>{range.title}</SpringLink>
          </li>
        ))}
      </ul>
    </nav>
  ) : null
}

export default CatalogLinks

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import CollectionCard from "./CollectionCard"
import theme from "../theme/theme"

const {
  mq: { tabletLandscapeUp },
} = theme

const StyledCollections = styled.div`
  background-color: ${({ theme }) => theme.colors.bgColor};

  .item__1 {
    grid-area: one;
  }
  .item__2 {
    grid-area: two;
  }
  .item__3 {
    grid-area: three;
  }
  .item__4 {
    grid-area: four;
  }
  .item__5 {
    grid-area: five;
  }

  margin: 0 auto ${({ theme }) => theme.spacing.section} auto;
  width: 90%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${tabletLandscapeUp} {
    width: 100%;
    display: grid;
    grid-gap: ${({ theme }) => theme.spacing.gridGap};
    grid-template-areas:
      "one one one two two two"
      "three three four four five five";
  }
`

const Collections = ({ style }) => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiRange {
        nodes {
          slug
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  const col = ["Cork", "Plywood"].map(
    (title) =>
      data.allStrapiRange.nodes.filter((node) => node.title === title)[0]
  )

  return (
    <StyledCollections className={`collection`}>
      <CollectionCard delay={0} className={`item__1`} collection={col[0]} />
      <CollectionCard delay={0} className={`item__2`} collection={col[1]} />
    </StyledCollections>
  )
}

export default Collections

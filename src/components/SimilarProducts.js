import React from "react"
import styled from "@emotion/styled"
import ProductGrid from "../components/ProductsListing/ProductGrid"

const SimilarProductsGrid = styled.div`
  width: calc(100% - ${({ theme }) => theme.spacing.gridGap});
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  h2 {
    margin-bottom: 1rem;
  }
`
const SimilarProducts = ({
  style,
  className,
  collection: { node: parent },
  currentProduct,
}) => {
  const { products } = parent
  const similarProducts = products.filter(
    (product) => product.title !== currentProduct
  )
  if (!similarProducts.length) return null
  return (
    <SimilarProductsGrid {...{ className }} {...{ style }}>
      <h2>Similar products</h2>
      <ProductGrid products={similarProducts} />
    </SimilarProductsGrid>
  )
}

export default SimilarProducts

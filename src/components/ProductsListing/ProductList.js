import React from "react"
import styled from "@emotion/styled"
import ProductGrid from "./ProductGrid"
import ProductCount from "./ProductCount"
import CatalogLinks from "./CatalogLinks"
import DropdownMenu from "../DropdownMenu"
import theme from "../../theme/theme"

const {
  mq: { small, tabletLandscapeUp },
} = theme

const StyledProductList = styled.div`
  .prod__header {
    width: calc(100% - 2rem);
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    margin-bottom: 2rem;
  }

  .prod__title {
    text-align: center;
    padding: 2rem;
    line-height: 1em;
    font-size: 2rem;
  }

  ${small} {
    .prod__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .prod__title {
      width: 100%;
    }
    .prod__links {
      width: 50%;
    }
    .prod__count {
      width: 50%;
      text-align: right;
    }
  }

  .prod__links {
    ${tabletLandscapeUp} {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .prod__count {
    display: inline-block;
    ${tabletLandscapeUp} {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
    font-weight: bold;
  }

  .product-grid {
    padding-bottom: 4rem;
    width: calc(100% - 2rem);
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.maxWidth};
  }
`

const ProductList = ({ products, title = "Catalog" }) => {
  const hasProducts = products.length > 0
  return (
    <StyledProductList>
      <div className="prod__header">
        <h1 className="prod__title">{title}</h1>
        <div className="prod__links">
          <DropdownMenu title="Filter by collection">
            <CatalogLinks />
          </DropdownMenu>
        </div>

        {hasProducts && (
          <ProductCount className="prod__count" {...{ products }} />
        )}
      </div>
      <ProductGrid {...{ products }} />
    </StyledProductList>
  )
}

export default ProductList

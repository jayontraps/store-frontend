import React from "react"
import styled from "@emotion/styled"
import { SpringLink } from "../react-spring-animation"
import Image from "gatsby-image"
import { formatPrice } from "../../utils/formatPrice"

const StyledCard = styled(SpringLink)`
  display: block;
  text-decoration: none;
  color: inherit;
  .product_card__title,
  .product__price {
    margin-bottom: 0.5rem;
  }
  .product_card__img {
    margin-bottom: 1rem;
  }
  .product__price {
  }
  .product_card__title {
    font-size: 1.25rem;
  }
`
const ProductCard = ({ product }) => {
  const { thumbnail, name, slug, price, number_in_set, itemType } = product

  return (
    <StyledCard
      className="product_card"
      to={`/product/${slug}`}
      style={{ display: "block", marginBottom: "2rem", width: "300px" }}
    >
      <Image
        className="product_card__img"
        fluid={thumbnail.childImageSharp.fluid}
      />
      <h3 className="product_card__title">{name}</h3>
      <p className="product__details">{`Set of ${number_in_set} ${itemType}s`}</p>
      <p className="product__price">{formatPrice(price)}</p>
    </StyledCard>
  )
}

export default ProductCard

import React from "react"

const ProductCount = ({ products, className }) => {
  return (
    <span {...{ className }}>{`${products.length} set${
      products.length > 1 ? `s` : ``
    }`}</span>
  )
}

export default ProductCount

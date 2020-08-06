import React, { useState, useEffect, useContext } from "react"
import styled from "@emotion/styled"
import { CartContext } from "../../context/CartContext"
import LoadingSpinner from "../LoadingSpinner"
import Quantity from "./Quantity"

const StyledAddToCartButton = styled.button`
  appearance: none;
  display: block;
  position: relative;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.active};
  padding: 1rem 3rem;
  color: white;
  font-size: 1rem;
  transition: transform 150ms;
  width: 240px;
  height: 50px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.active};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.active};
  }
`

const AddToCart = ({ data }) => {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const { addToCart } = useContext(CartContext)

  function add({ data, quantity }) {
    addToCart(data, quantity)
    setAdded(true)
    setIsLoading(true)
  }

  useEffect(() => {
    var timeoutID
    if (isLoading) {
      timeoutID = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
    return () => {
      window.clearTimeout(timeoutID)
    }
  }, [isLoading])

  const action = added ? "Added" : "Add"
  return (
    <>
      <Quantity {...{ quantity, setQuantity }} />
      <StyledAddToCartButton
        className="button"
        onClick={() => add({ data, quantity })}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingSpinner colorModer="light" />
        ) : (
          `${action} to basket`
        )}
      </StyledAddToCartButton>
    </>
  )
}

export default AddToCart

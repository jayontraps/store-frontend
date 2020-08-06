import React from "react"
import styled from "@emotion/styled"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

const StyledSetQuantity = styled.div`
  h3 {
    margin-bottom: 0.5rem;
    font-weight: normal;
    text-transform: uppercase;
    font-size: 0.9rem;
  }
  .quantity {
    position: relative;
    width: 160px;
    margin-bottom: 1rem;
  }

  input,
  button {
    appearance: none;
    display: inline-block;
    padding: 1em;
    border: none;
    font-size: 1rem;
    line-height: 1rem;
    height: 50px;
  }
  button {
    width: 45px;
    position: absolute;
    top: 0;
    &.quantity_reduce {
      left: 0;
    }
    &.quantity_increase {
      right: 0;
    }
  }
  input {
    width: 160px;
    padding: 1rem 45px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
  }
  svg {
    font-size: 1rem;
  }
`

const Quantity = ({
  showTitle = true,
  isLoading = false,
  quantity = 1,
  setQuantity = () => {},
}) => {
  return (
    <StyledSetQuantity {...{ isLoading }} className="product__quantity">
      {showTitle && <h3>Quantity</h3>}
      <div className="quantity">
        <button
          aria-label="Reduce item quantity by one"
          className="button quantity_reduce"
          onClick={(e) => setQuantity(quantity - 1)}
          disabled={isLoading || quantity <= 1}
        >
          <RemoveIcon />
        </button>
        <input
          type="text"
          className="quantity_total"
          value={quantity}
          min="1"
          aria-label="quantity"
          pattern="[0-9]*"
          name="quantity"
          onChange={() => {}}
        />
        <button
          aria-label="Increase item quantity by one"
          className="button quantity_increase"
          onClick={(e) => setQuantity(quantity + 1)}
          disabled={isLoading}
        >
          <AddIcon />
        </button>
      </div>
    </StyledSetQuantity>
  )
}

export default Quantity

import React, { useContext } from "react"
import styled from "@emotion/styled"
import Quantity from "./Quantity"
import theme from "../../theme/theme"
import { formatPrice } from "../../utils/formatPrice"
import { CartContext } from "../../context/CartContext"

const {
  mq: { tabletLandscapeUp },
} = theme

const StyledLineItem = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 100px 60px;
  ${tabletLandscapeUp} {
    grid-template-columns: 100px 1fr 160px 60px;
    grid-template-rows: 1fr;
  }

  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  .line-item {
    &__col {
      > * {
        margin-bottom: 0.25rem;
      }
    }

    &__details {
      width: 40%;
      margin-bottom: 2rem;
      ${tabletLandscapeUp} {
        width: 30%;
        margin-bottom: 0rem;
      }
    }

    &__quantity {
    }

    &__subtotal {
      font-weight: bold;
    }

    &__img {
      max-width: 100px;
    }

    &__subtotal {
      display: block;
      text-align: right;
    }

    &__remove {
      padding: 0.5rem 1rem;
      display: inline-flex;
      background-color: transparent;

      border: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
  }
`

const LineItem = ({ isLoading, item }) => {
  const { updateQuantity, removeProductFromCart } = useContext(CartContext)

  function setQuantity(quantity) {
    updateQuantity(item, quantity)
  }

  return (
    <StyledLineItem className="line-item">
      <div className="line-item__col">
        <img
          className="line-item__img"
          src={item.thumbnail.childImageSharp.fluid.src}
          alt=""
        />
      </div>
      <div className="line-item__col line-item__details">
        <h4 className="line-item__title">{item.name}</h4>
        <div className="line-item__price">{formatPrice(item.price)}</div>
        <button
          className="line-item__remove button"
          onClick={() => removeProductFromCart(item)}
        >
          Remove{" "}
        </button>
      </div>
      <div className="line-item__col line-item__quantity">
        <Quantity
          showTitle={false}
          quantity={item.qty}
          {...{ setQuantity, isLoading }}
        />
      </div>
      <div className="line-item__col">
        <span className="line-item__subtotal">{formatPrice(item.price)}</span>
      </div>
    </StyledLineItem>
  )
}

export default LineItem

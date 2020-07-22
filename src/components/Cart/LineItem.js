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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  ${tabletLandscapeUp} {
    flex-wrap: nowrap;
  }

  .line-item {
    &__col {
      > * {
        margin-bottom: 0.25rem;
      }
    }

    &__details {
      width: 50%;
      margin-bottom: 2rem;
      ${tabletLandscapeUp} {
        width: 40%;
        margin-bottom: 0rem;
      }
    }

    &__price {
    }

    &__subtotal {
      font-weight: bold;
    }

    &__img {
      max-width: 120px;
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
        <h4 className="line-item__title">{item.title}</h4>
        <div className="line-item__price">{formatPrice(item.price)}</div>
        <button
          className="line-item__remove button"
          onClick={() => removeProductFromCart(item)}
        >
          Remove{" "}
        </button>
      </div>
      <div className="line-item__col">
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

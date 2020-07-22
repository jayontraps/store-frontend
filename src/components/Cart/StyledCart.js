import styled from "@emotion/styled"
import theme from "../../theme/theme"

const {
  mq: { tabletLandscapeUp },
} = theme

const StyledCart = styled.div`
  padding: 5rem 2rem 2rem 2rem;
  background-color: white;
  min-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  .cart__header {
    position: absolute;
    top: 0;
    left: 2rem;
    width: calc(100% - 4rem);
    height: 4rem;
    padding: 1rem 2rem 2rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  }
  .cart__line_items {
  }
  .cart__footer {
  }
  .total__title {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .total__price {
    display: inline-block;
    min-width: 50px;
    position: relative;
  }
  .buy_btn_wrapper {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    width: 100%;
    ${tabletLandscapeUp} {
      justify-content: flex-end;
    }
  }
  .buy_btn {
    color: white;
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.active};
    min-width: 300px;
  }
`

export default StyledCart

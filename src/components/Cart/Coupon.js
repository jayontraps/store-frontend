import React, { useState } from "react"
import styled from "@emotion/styled"
import theme from "../../theme/theme"

const {
  mq: { tabletLandscapeUp },
} = theme

const StyledCoupon = styled.div`
  .field,
  .add_coupon_btn,
  .remove_coupon_btn,
  .title {
    margin-bottom: 0.5rem;
  }
  .label {
    display: inline-block;
  }
  .input {
    appearance: none;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    outline: none;
    display: inline-block;
    padding: 0.25rem;
    margin: 0 1rem;
  }
  .add_coupon_btn {
  }
  .title {
    font-size: 1rem;
  }
  .coupon__form {
    ${tabletLandscapeUp} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin-bottom: 2rem;
  padding-bottom: 1rem;
`

const Coupon = ({
  checkout,
  checkCoupon = () => {},
  removeCoupon = () => {},
}) => {
  const [coupon, setCoupon] = useState("")
  return checkout.discountApplications.length > 0 ? (
    <StyledCoupon>
      Coupon:
      <h5 className="title">
        {checkout.discountApplications[0].code} -{" "}
        {checkout.discountApplications[0].value.percentage}% off
      </h5>
      <button
        onClick={() => removeCoupon(checkout.discountApplications[0].code)}
        className="remove_coupon_btn button btn_icon"
      >
        Remove
      </button>
    </StyledCoupon>
  ) : (
    <StyledCoupon>
      <form
        className="coupon__form"
        onSubmit={(e) => {
          e.preventDefault()
          checkCoupon(coupon)
        }}
      >
        <div className="field">
          <label aria-label="coupon" htmlFor="coupon" className="label">
            Coupon code:
          </label>
          <input
            className="input"
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            type="text"
          />
        </div>
        {checkout.userErrors && checkout.userErrors.length > 0 && (
          <p>{`Unable to find a coupon code matching: ${coupon}`}</p>
        )}
        <button className="add_coupon_btn button btn_icon">Add Coupon</button>
      </form>
    </StyledCoupon>
  )
}

export default Coupon

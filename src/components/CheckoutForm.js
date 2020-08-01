import React, { useEffect, useState, useContext } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import styled from "@emotion/styled"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { CartContext } from "../context/CartContext"
import { formatPrice } from "../utils/formatPrice"
import { API_URL } from "../utils/url"
import LoadingSpinner from "./LoadingSpinner"

const StyledContainer = styled.div`
  .title {
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.25rem;
  }
  .FormGroup {
    margin-bottom: 1rem;
    padding: 0;
    border-style: none;
    background-color: ${({ theme }) => theme.colors.checkout.bgColor};
    will-change: opacity, transform;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    > div:first-of-type {
      .FormRow {
        border-top: none;
      }
    }
    &.card-options {
      .FormRow {
        border-top: none;
      }
    }
  }

  .FormRow {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 1rem;
    border-top: 1px solid ${({ theme }) => theme.colors.checkout.border};
  }

  .FormRowLabel {
    width: 20%;
    min-width: 70px;
    padding: 11px 0;
    color: ${({ theme }) => theme.colors.checkout.label};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .FormRowInput:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.active};
    /* Hack to hide the default webkit autofill */
    transition: background-color 100000000s;
    animation: 1ms void-animation-out;
  }

  .FormRowInput {
    font-size: 16px;
    width: 100%;
    padding: 11px 15px 11px 0;
    background-color: transparent;
    animation: 1ms void-animation-out;
  }

  .FormRowInput::placeholder {
    color: ${({ theme }) => theme.colors.checkout.placeholder};
  }

  .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  .StripeElement {
    width: 100%;
    padding: 11px 15px 11px 0;
  }

  .buy_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 1rem;
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.active};
    color: white;
    padding: 1rem 3rem;
    min-width: 180px;
    min-height: 50px;
    &:hover {
      cursor: pointer;
    }
  }

  .invalid {
    margin-top: 1rem;
    font-weight: bold;
  }

  .success-msg {
    h2 {
      margin-bottom: 1rem;
    }
    h4 {
      font-size: 1rem;
    }
  }
`

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#17181A",
      color: "#17181A",
      fontWeight: 500,
      fontSize: "15px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#17181A" },
      "::placeholder": { color: "#17181A" },
    },
    invalid: {
      iconColor: "#17181A",
      color: "#17181A",
    },
  },
}

const StyledRow = styled.div`
  position: relative;

  input {
    appearance: none;
    outline: none;
    display: block;
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    background-color: transparent;
  }
  .error-msg {
    color: red;
    margin-left: 15px;
    font-size: 1rem;
    padding-bottom: 0.5rem;
    line-height: 1rem;
  }
`

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, clearCart } = useContext(CartContext)
  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("loading")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [order, setOrder] = useState(null)
  const [cardIsInvalid, setCardIsInvalid] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    setLoading(true)

    const result = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    console.log("result", result)

    if (result.error !== undefined) {
      setCardIsInvalid(result.error.message)
      setLoading(false)
      setSubmitting(false)
      setSuccess(false)
      console.log("stripe: ", stripe)
      // console.log("isSubmitting: ", isSubmitting)

      return
    }

    const data = {
      ...values,
      paymentIntent: result.paymentIntent,
      cart,
    }

    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Error:", error)
    })

    const order = await response.json()
    setOrder(order)

    console.log("order: ", order)

    setLoading(false)
    clearCart()
    setSubmitting(false)
    setSuccess(true)
  }

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true)
      const response = await fetch(`${API_URL}/orders/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.map((product) => ({
            ...product,
            ...{ id: product.strapiId },
          })),
        }),
      })

      const data = await response.json()

      // console.log("loadToken data", data)
      setToken(data.client_secret)
      setTotal(data.amount)
      setLoading(false)
    }

    loadToken()
  }, [cart])

  return (
    <StyledContainer
      style={{
        position: "relative",
      }}
    >
      {!success && (
        <>
          <h3 className="title">Total to pay: {formatPrice(total)}</h3>
          <h4>Your contact details:</h4>
        </>
      )}

      {!success && (
        <Formik
          initialValues={{
            email: "",
            shipping_name: "",
            shipping_address: "",
            shipping_state: "",
            shipping_country: "",
            shipping_zip: "",
          }}
          validate={(values) => {
            const errors = {}
            const requiredFields = [
              "email",
              "shipping_name",
              "shipping_address",
              "shipping_state",
              "shipping_country",
              "shipping_zip",
            ]
            requiredFields.forEach((field) => {
              if (!values[field]) {
                errors[field] = "Required field"
              }
            })
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address"
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, { setSubmitting })
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <fieldset className="FormGroup">
                <StyledRow>
                  <div className="FormRow">
                    <label className="FormRowLabel" htmlFor="shipping_name">
                      Name
                    </label>
                    <Field
                      className="FormRowInput"
                      id="shipping_name"
                      type="text"
                      name="shipping_name"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <ErrorMessage
                    name="shipping_name"
                    component="div"
                    className="error-msg"
                  />
                </StyledRow>

                <StyledRow>
                  <div className="FormRow">
                    <label className="FormRowLabel" htmlFor="email">
                      Email
                    </label>
                    <Field
                      className="FormRowInput"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="janedoe@gmail.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-msg"
                  />
                </StyledRow>
              </fieldset>

              <h4>Your shipping details:</h4>

              <fieldset className="FormGroup">
                <StyledRow>
                  <div className="FormRow">
                    <label className="FormRowLabel" htmlFor="shipping_address">
                      Address
                    </label>
                    <Field
                      className="FormRowInput"
                      id="shipping_address"
                      type="text"
                      name="shipping_address"
                      placeholder="Enter your address"
                    />
                  </div>
                  <ErrorMessage
                    name="shipping_address"
                    component="div"
                    className="error-msg"
                  />
                </StyledRow>

                <StyledRow>
                  <div className="FormRow">
                    <label className="FormRowLabel" htmlFor="shipping_state">
                      City
                    </label>
                    <Field
                      className="FormRowInput"
                      id="shipping_state"
                      type="text"
                      name="shipping_state"
                      placeholder="Enter your city"
                    />
                  </div>
                  <ErrorMessage
                    name="shipping_state"
                    component="div"
                    className="error-msg"
                  />
                </StyledRow>

                <StyledRow>
                  <div className="FormRow">
                    <label className="FormRowLabel" htmlFor="shipping_country">
                      Country
                    </label>
                    <Field
                      className="FormRowInput"
                      id="shipping_country"
                      type="text"
                      name="shipping_country"
                      placeholder="Enter your country"
                    />
                  </div>
                  <ErrorMessage
                    name="shipping_country"
                    component="div"
                    className="error-msg"
                  />
                </StyledRow>

                <StyledRow>
                  <div className="FormRow">
                    <label className="FormRowLabel" htmlFor="shipping_zip">
                      Post Code
                    </label>
                    <Field
                      className="FormRowInput"
                      id="shipping_zip"
                      type="text"
                      name="shipping_zip"
                      placeholder="Enter your post code"
                    />
                  </div>
                  <ErrorMessage
                    name="shipping_zip"
                    component="div"
                    className="error-msg"
                  />
                </StyledRow>
              </fieldset>

              <fieldset className="FormGroup card-options">
                <div className="FormRow">
                  <CardElement options={CARD_OPTIONS} />
                </div>
              </fieldset>

              <button
                className="button buy_btn"
                type="submit"
                disabled={!stripe || isSubmitting}
              >
                {loading ? <LoadingSpinner /> : `Pay ${formatPrice(total)}`}
              </button>
            </Form>
          )}
        </Formik>
      )}
      {cardIsInvalid && !success && (
        <p className="invalid">{`${cardIsInvalid} Please try again.`}</p>
      )}
      {success && order && (
        <div className="success-msg">
          <h2>Your order was successfully processed.</h2>
          <h4>{`Your order number is ${order.customer_order_id}.`}</h4>
        </div>
      )}
    </StyledContainer>
  )
}

export default CheckoutForm

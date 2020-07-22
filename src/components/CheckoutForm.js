import React, { useEffect, useState, useContext } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { CartContext } from "../context/CartContext"
import { formatPrice } from "../utils/formatPrice"
import { API_URL } from "../utils/url"
import LoadingSpinner from "./LoadingSpinner"

const Card_Styles = {
  style: {
    base: {
      padding: "24px 12px",
      fontSize: "16px",
    },
  },
}

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, clearCart } = useContext(CartContext)
  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("loading")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("handleSubmit", event)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    setLoading(true)
    console.log("HandleSubmit", event)
    const result = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    setLoading(false)
    console.log("HandleSubmit result", result)
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

      console.log("loadToken data", data)
      setToken(data.client_secret)
      setTotal(data.amount)
      setLoading(false)
    }

    loadToken()
  }, [cart])

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {loading ? <LoadingSpinner /> : <h3>Total: {formatPrice(total)}</h3>}

      {!success && (
        <form
          style={{
            padding: "24px 12px",
            border: "1px solid #eee",
            margin: "20px 0",
          }}
          onSubmit={handleSubmit}
        >
          <CardElement options={Card_Styles} />
          <button style={{ marginTop: "12px" }} disabled={!stripe}>
            Buy it
          </button>
        </form>
      )}
      {success && <h2>Your order was successfully processed!</h2>}
    </div>
  )
}

export default CheckoutForm

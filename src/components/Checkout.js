import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

const stripe = loadStripe(process.env.GATSBY_STRIPE_KEY)

export default () => (
  <div>
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  </div>
)

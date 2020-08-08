import React from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import theme from "../theme/theme"
import Checkout from "../components/Checkout"

const {
  mq: { medium, small },
} = theme

const StyledContent = styled.div`
  width: 95%;
  min-height: 100vh;
  max-width: ${({ theme }) => theme.layout.innerWidth};
  margin: 2rem auto;
`

const CheckoutPage = () => {
  return (
    <Layout>
      <SEO title="Checkout" />
      <StyledContent>
        <Checkout />
      </StyledContent>
    </Layout>
  )
}

export default CheckoutPage

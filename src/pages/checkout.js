import React from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Checkout from "../components/Checkout"

const StyledContent = styled.div`
  width: 95%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
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

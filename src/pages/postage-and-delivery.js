import React from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledContent = styled.div`
  width: 95%;
  max-width: ${({ theme }) => theme.layout.innerWidth};
  margin: 2rem auto;
  h1,
  p,
  h3 {
    margin-bottom: 1rem;
  }
`

const PostageAndDelivery = () => {
  return (
    <Layout>
      <SEO title="Postage and Delivery" />
      <StyledContent>
        <h1>Postage & Delivery</h1>
        <p>
          Items will be posted within 48 hours excluding weekends. Post and
          packing will be charged at a flat fee of £3.50. No charge on orders
          over £50. Delivery time is usually 3 to 6 working days. Sorry we do
          not post internationally. Packaging is recyclable or biodegradable
          wherever possible.{" "}
        </p>

        <h3>Returns:</h3>
        <p>
          If you are unhappy with your purchase, please email first, then return
          within seven days in re-saleable condition to receive a replacement or
          refund.
        </p>
      </StyledContent>
    </Layout>
  )
}

export default PostageAndDelivery

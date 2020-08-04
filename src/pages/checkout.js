import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { isMobile } from "react-device-detect"
import styled from "@emotion/styled"
import { useTransition, animated } from "react-spring"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ZoomIn } from "../components/react-spring-animation"
import Checkout from "../components/Checkout"
import theme from "../theme/theme"

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

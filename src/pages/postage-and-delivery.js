import React, { useState } from "react"
import styled from "@emotion/styled"
import { useTransition, animated } from "react-spring"
import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledContent = styled.div`
  width: 95%;
  max-width: ${({ theme }) => theme.layout.innerWidth};
  margin: 2rem auto;
`

const PostageAndDelivery = () => {
  return (
    <Layout>
      <SEO title="Postage and Delivery" />
      <StyledContent>
        <h1>Postage & Delivery</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit
          repudiandae facilis voluptatum mollitia porro ipsam animi deserunt
          quidem asperiores! Nobis iste aliquid, molestiae rerum quaerat nisi ab
          libero possimus.
        </p>
      </StyledContent>
    </Layout>
  )
}

export default PostageAndDelivery

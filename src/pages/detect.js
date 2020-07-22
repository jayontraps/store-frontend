import React from "react"
import styled from "@emotion/styled"
import {
  BrowserView,
  MobileView,
  // isBrowser,
  // isMobile,
} from "react-device-detect"
import Layout from "../components/layout"

const Page = styled.div`
  margin-top: 100px;
  padding: 20px;
`

const Detect = () => {
  return (
    <Layout>
      <Page>
        <h1>Detect</h1>
        <BrowserView>
          <h1> This is rendered only in browser </h1>
        </BrowserView>
        <MobileView>
          <h1> This is rendered only on mobile </h1>
        </MobileView>
      </Page>
    </Layout>
  )
}

export default Detect

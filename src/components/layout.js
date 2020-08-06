import React from "react"
import { Global } from "@emotion/core"
import styled from "@emotion/styled"
import globalStyles from "../theme/global"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header/header.js"
import Footer from "./Footer/footer"
import { PageTransition } from "./react-spring-animation"

const StyledLayout = styled.div`
  position: relative;
  min-height: 100vh;
  padding-top: ${({ withHero }) => (withHero ? "0px" : "60px")};
  width: 100vw;
  background-color: ${({ theme, bgColor }) =>
    bgColor === "dark" ? theme.colors.bgColorDark : theme.colors.bgColor};
  color: ${({ theme, bgColor }) =>
    bgColor === "dark" ? "white" : theme.colors.primary};
`

const Layout = ({
  children,
  withHero = false,
  isHomePage = false,
  bgColor,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Global styles={globalStyles} />
      <Header
        {...{ withHero, isHomePage }}
        siteTitle={data.site.siteMetadata.title}
      />
      <PageTransition>
        <StyledLayout {...{ bgColor }} withHero={withHero}>
          {children}
        </StyledLayout>
        <Footer />
      </PageTransition>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

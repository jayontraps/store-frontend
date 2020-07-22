import React from "react"
import styled from "@emotion/styled"

const StyledFooter = styled.footer`
  position: relative;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.slate};
`

const Section = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.slate};
  color: white;
  padding: 3rem 0;
  width: ${({ theme }) => theme.layout.width};
  max-width: ${({ theme }) => theme.layout.maxWidth};
`

const Footer = () => {
  return (
    <StyledFooter>
      <Section>
        <h2>Footer</h2>
      </Section>
    </StyledFooter>
  )
}

export default Footer

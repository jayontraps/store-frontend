import React from "react"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
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
const StyledSocialLinks = styled.ul`
  margin: 0;
  padding-left: 0;

  li {
    display: inline-block;
    list-style: none;
  }
  a {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    svg {
      width: 100%;
      height: 100%;
      fill: #fff;
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <Section>
        <StyledSocialLinks>
          <li>
            <a href="/">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="/">
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a href="/">
              <AlternateEmailIcon />
            </a>
          </li>
        </StyledSocialLinks>
      </Section>
    </StyledFooter>
  )
}

export default Footer

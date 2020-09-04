import React from "react"
import { SpringLink } from "../react-spring-animation"
import FacebookIcon from "@material-ui/icons/Facebook"
import styled from "@emotion/styled"

const StyledFooter = styled.footer`
  position: relative;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.slate};
  padding: 1rem 0;
`

const Section = styled.div`
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.slate};
  color: white;
  padding: 1rem 0;
  width: ${({ theme }) => theme.layout.width};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  display: flex;

  li {
    list-style: none;
  }
`

const SocialList = styled.ul`
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  padding-left: 0;
  display: flex;
  li {
    margin-left: 1rem;
  }
  a {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    svg {
      width: 100%;
      height: 100%;
      fill: #fff;
    }
  }
`

const FooterLinks = styled.ul`
  margin-right: 1rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: #fff;
    }
  }
`

const Footer = () => {
  const today = new Date()
  const year = today.getFullYear()
  return (
    <StyledFooter>
      <Section>
        <FooterLinks>
          <li>
            <SpringLink to="/about">About us</SpringLink>
          </li>
          <li>
            <SpringLink to="/postage-and-delivery">
              Postage and Delivery
            </SpringLink>
          </li>

          <li>
            <SpringLink to="/contact">Contact us</SpringLink>
          </li>
        </FooterLinks>
        <SocialList>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.facebook.com/plycoasters/"
            >
              <FacebookIcon />
            </a>
          </li>
        </SocialList>
      </Section>
      <Section>&copy; {`Copyright 2008-${year} Ply Coasters`}</Section>
    </StyledFooter>
  )
}

export default Footer

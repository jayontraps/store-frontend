import React from "react"
import styled from "@emotion/styled"

const StyledLoader = styled.div`
  border: 4px solid
    ${({ colorModer, theme }) =>
      colorModer === "dark" ? theme.colors.slate : "#FFF"};
  border-top-color: rgba(0, 0, 0, 0);
  border-left-color: rgba(0, 0, 0, 0);
  width: 24px;
  height: 24px;
  opacity: 0.8;
  border-radius: 50%;
  animation: loadingSpinner 0.7s infinite linear;
  -webkit-animation: loadingSpinner 0.7s infinite linear;
  margin-top: calc(-28px / 2);
  margin-left: calc(-28px / 2);
  position: absolute;
  top: 50%;
  left: 50%;

  @keyframes loadingSpinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loadingSpinner {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`

const LoadingSpinner = ({ colorModer = "dark" }) => {
  return <StyledLoader {...{ colorModer }} />
}

export default LoadingSpinner

import React from "react"
import styled from "@emotion/styled"
import Icon from "./Icon"

const StyledScrollDown = styled.span`
  display: block;
  width: 30px;
  transform: rotate(90deg);
  svg {
    stroke: white;
    stroke-width: 10px;
    fill: none;
    display: inline-block;
    width: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`

const ScrollDown = ({ className, onClick }) => {
  return (
    <StyledScrollDown className={`${className} scroll_down`}>
      <Icon onClick={onClick} name="arrow-next" />
    </StyledScrollDown>
  )
}

export default ScrollDown

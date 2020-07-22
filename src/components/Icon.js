import React from "react"
import { string, object } from "prop-types"

const Icon = ({
  title = "",
  name = "",
  className = "",
  style = {},
  onClick = () => {},
}) => (
  <svg className={`icon ${className}`} {...{ style, name, onClick }}>
    {title.length > 0 && <title>{title}</title>}
    <use xlinkHref={`#${name}`} />
  </svg>
)

Icon.propTypes = {
  name: string.isRequired,
  className: string,
  style: object,
}

export default Icon

import React, { useState, useEffect } from "react"
import { Spring } from "react-spring/renderprops"
import { useTransition, animated } from "react-spring"
import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link"

export const PageTransition = ({ children }) => (
  <TransitionState>
    {({ transitionStatus, exit, entry }) => {
      const mount = ["entering", "entered"].includes(transitionStatus)
      const seconds = mount ? entry.length : exit.length

      return (
        <Spring
          to={{
            opacity: mount ? 1 : 0,
          }}
          config={{
            duration: seconds * 800,
          }}
        >
          {(props) => <div style={props}>{children}</div>}
        </Spring>
      )
    }}
  </TransitionState>
)

export const SpringLink = React.forwardRef((props, ref) => {
  const { to, children, className, activeClassName } = props
  return (
    <TransitionLink
      ref={ref}
      {...{ activeClassName }}
      {...{ className }}
      to={to}
      exit={{ length: 1 }}
      entry={{ length: 1 }}
    >
      {children}
    </TransitionLink>
  )
})

export const ZoomIn = ({ children }) => {
  const [show, set] = useState(false)
  const transitions = useTransition(show, null, {
    from: { transform: "scale3d(1, 1, 1)" },
    enter: { transform: "scale3d(1.03, 1.03, 1.03)" },
    leave: { transform: "scale3d(1, 1, 1)" },
  })

  useEffect(() => {
    set(true)
  }, [])

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          {children}
        </animated.div>
      )
  )
}

export default { PageTransition, SpringLink, ZoomIn }

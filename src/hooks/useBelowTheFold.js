import { useState, useEffect, useCallback } from "react"
import { throttle } from "lodash"
const isBrowser = typeof window !== "undefined"

const useBelowTheFold = () => {
  const [belowTheFold, setBelowTheFold] = useState(false)

  let theFold = 0
  if (isBrowser) {
    theFold = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    )
  }

  const scrollPosition = useCallback(
    throttle(
      () => {
        const currentSrollPosition = window.scrollY
        setBelowTheFold(currentSrollPosition + 150 > theFold)
      },
      300,
      { leading: false }
    ),
    [setBelowTheFold]
  )

  useEffect(() => {
    window.addEventListener("scroll", scrollPosition)

    return () => {
      window.removeEventListener("scroll", scrollPosition)
    }
  }, [scrollPosition])

  return belowTheFold
}

export default useBelowTheFold

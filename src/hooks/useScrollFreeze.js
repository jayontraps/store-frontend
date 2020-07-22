import { useLayoutEffect } from "react"

const useScrollFreeze = () => {
  useLayoutEffect(() => {
    const original = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = original
    }
  }, [])
}

export default useScrollFreeze

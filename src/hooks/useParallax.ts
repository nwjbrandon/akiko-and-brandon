import { useEffect, useState, type RefObject } from "react"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Scroll offset for the hero's backdrop, paused while off-screen and disabled
 * entirely when the visitor asks for reduced motion.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  { factor = 0.3, maxOffset = 100 } = {},
) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = false
    let frame = 0

    const update = () => {
      frame = 0
      if (reduceMotion.matches || !visible) {
        setOffset(0)
        return
      }
      const top = element.getBoundingClientRect().top + window.scrollY
      setOffset(clamp((window.scrollY - top) * factor, 0, maxOffset))
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        if (!visible) return setOffset(0)
        schedule()
      },
      { threshold: 0 },
    )
    observer.observe(element)

    reduceMotion.addEventListener("change", schedule)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    schedule()

    return () => {
      observer.disconnect()
      reduceMotion.removeEventListener("change", schedule)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ref, factor, maxOffset])

  return offset
}

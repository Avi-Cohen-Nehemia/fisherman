import { useEffect, useRef } from "react"

export const useEventListener = (event, callback, element = window) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const handler = (e) => callbackRef.current(e)
    element.addEventListener(event, handler)

    return () => element.removeEventListener(event, handler)
  }, [event, element])
}

export default useEventListener

import { useRef, useCallback } from "react";

/**
 * Custom React hook that returns a throttled action handler callback.
 * @param {Function} callback - The action handler callback to throttle.
 * @param {number} delay - The throttle window delay in milliseconds.
 * @returns {Function} The throttled callback.
 */
export default function useThrottle(callback, delay) {
  const lastRun = useRef(0);

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}

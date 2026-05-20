import { useState, useEffect } from "react";

/**
 * Custom React hook that returns a debounced version of a given value.
 * @param {any} value - The input value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {any} The debounced value.
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

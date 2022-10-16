import { useEffect, useRef } from 'react';

/* a hook to keep track of the previous state of a given value  */
export const usePrevious = (value) => {
  const ref = useRef();

  // store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // return previous value (happens before update in useEffect above)
  return ref.current;
};

export default usePrevious;

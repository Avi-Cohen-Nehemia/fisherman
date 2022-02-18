import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const toggleState = (value) => {
    setState((prev) => (value ? value : !prev));
  };

  return [state, toggleState];
};

export default useToggle;

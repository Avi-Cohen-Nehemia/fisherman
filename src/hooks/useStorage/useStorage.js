import { useState, useEffect, useCallback } from "react";

const useStorage = (key, defaultValue, storage) => {
  const [value, setValue] = useState(() => {
    const storedValue = storage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      return storage.removeItem(key);
    }

    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  const removeValue = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, removeValue];
};

export default useStorage;

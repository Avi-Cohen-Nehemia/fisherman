import { useState, useEffect, useCallback } from "react";

export const useAsync = (callback, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const memoizedCallback = useCallback(() => {
    setLoading(true);
    setData(null);
    setError(null)
    callback()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);

  return { loading, data, error };
};

export default useAsync;

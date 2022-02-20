import { useState, useEffect } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(async () => {
    await fetch(url, options)
      .then((res) => {
        setData(res.json());
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { loading, data, error };
};

export default useFetch;

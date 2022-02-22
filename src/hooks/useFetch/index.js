import useAsync from "../useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" }
}

export const useFetch = (url, options = {}, dependencies = []) => {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return response.json((error) => Promise.reject(error));
      })
  }, dependencies)
};

export default useFetch;

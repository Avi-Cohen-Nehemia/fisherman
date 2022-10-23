import React, { useState, useEffect } from 'react';

const useQueryParam = (param, initialValue) => {
  const [value, setValue] = useState(initialValue);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {

  }, [value])

  return [value, setValue];
};

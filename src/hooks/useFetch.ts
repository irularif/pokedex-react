import { useEffect, useState } from "react";

const useFetch = (url: RequestInfo | undefined, options: RequestInit = {}) => {
  const [isLoading, setloading] = useState(false);
  const [error, seterror] = useState(null as any);
  const [data, setResponse] = useState(null as any);

  const run = async () => {
    if (!url) return;
    try {
      setloading(true);
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      seterror(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    run();
  }, []);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetch;

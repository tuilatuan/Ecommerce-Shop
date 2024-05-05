import { useState } from "react";

const useMutation = (promise) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const execute = async (payload, callback = {}) => {
    const { onSuccess, onFail, onFinal } = callback;
    try {
      setLoading(true);
      const res = await promise(payload);
      setData(res?.data?.data || []);
      onSuccess?.(res?.data?.data);
    } catch (error) {
      setError(error);
      onFail?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    data,
    loading,
    error,
  };
};

export default useMutation;

import { useState } from "react";
import axios from "axios";
import { useError } from "../context/ErrorContext";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const { setError } = useError();

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.message || "Lỗi khi gọi API");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading };
};

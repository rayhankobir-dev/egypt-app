import axiosInstance from "@/api";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type UseGetResponse<T> = {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: AxiosError | null;
  refetch: () => void;
};

const useGet = <T>(url: string): UseGetResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axiosInstance.get<T>(url);
      setData(response.data);
      setIsSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(null);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, isSuccess, isError, error, refetch };
};

export default useGet;

/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type UseDeleteResponse<T> = {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: AxiosError | null;
  deleteData: () => Promise<void>;
};

const useDelete = <T,>(url: string): UseDeleteResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const deleteData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axiosInstance.delete<T>(url);
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

  return { data, isLoading, isSuccess, isError, error, deleteData };
};

export default useDelete;

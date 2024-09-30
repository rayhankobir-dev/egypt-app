/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type UsePutResponse<T> = {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: AxiosError | null;
  putData: (body: any, isMultipart?: boolean) => Promise<void>;
};

const usePut = <T>(url: string): UsePutResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const putData = async (body: any, isMultipart: boolean = true) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const headers = isMultipart
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      const response = await axiosInstance.put<T>(url, body, { headers });
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

  return { data, isLoading, isSuccess, isError, error, putData };
};

export default usePut;

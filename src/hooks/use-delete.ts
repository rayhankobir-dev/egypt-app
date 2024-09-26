import axiosInstance from "@/api";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

// Define the function for useDelete with types
export const useDelete = <TData = unknown, TError = AxiosError>(
  url: string,
  options?: UseMutationOptions<TData, TError, string>
): UseMutationResult<TData, TError, string> => {
  return useMutation<TData, TError, string>(
    // Mutation function
    async (id) => {
      const { data }: AxiosResponse<TData> = await axiosInstance.delete(
        `${url}/${id}`
      );
      return data;
    },
    options // This should be passed as the second argument to useMutation
  );
};

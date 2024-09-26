import axiosInstance from "@/api";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const usePut = <
  TPayload = unknown,
  TData = unknown,
  TError = AxiosError
>(
  url: string,
  options?: UseMutationOptions<TData, TError, TPayload>
): UseMutationResult<TData, TError, TPayload> => {
  return useMutation<TData, TError, TPayload>(
    async (payload: TPayload): Promise<TData> => {
      const { data }: AxiosResponse<TData> = await axiosInstance.put(
        url,
        payload
      );
      return data;
    },
    options // Pass options as the second argument
  );
};

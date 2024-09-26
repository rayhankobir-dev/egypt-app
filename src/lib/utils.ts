/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatErrorObject(error: any) {
  if (!error.response.data.errors) return {};

  return error.response.data.errors.reduce(
    (acc: Record<string, string>, curr: Record<string, string>) => {
      const field = Object.keys(curr)[0];
      acc[field] = curr[field];
      return acc;
    },
    {}
  );
}

export const getTokenFromCookies = () => {
  return Cookies.get("token");
};

export const setTokenInCookies = (token: string) => {
  Cookies.set("token", token, { expires: 7, secure: true, sameSite: "strict" });
};

export const clearTokenFromCookies = () => {
  Cookies.remove("token");
};

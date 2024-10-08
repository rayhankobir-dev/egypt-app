import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return goBack;
};

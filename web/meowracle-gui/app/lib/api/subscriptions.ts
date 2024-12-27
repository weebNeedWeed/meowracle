import { useMutation } from "react-query";
import { apiClient } from "./api-client";

const subscribeForLetters = async (email: string) => {
  const data = await apiClient.post("/subscriptions", { email });
  return data;
};

export const useSubscribeForLetters = () => {
  return useMutation({
    mutationFn: subscribeForLetters,
  });
};

import { useQuery } from "react-query";
import { apiClient } from "./api-client";

export type Badge = {
  id: string;
  title: string;
  path: string;
  level: number;
};

const QUERY_KEY = ["badges"];

const fetchBadges = async (): Promise<Badge[]> => {
  const data = await apiClient.get<Badge[]>("/badges");
  return data;
};

export const useBadges = () => {
  return useQuery<Badge[], Error>(QUERY_KEY, () => fetchBadges(), {
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};

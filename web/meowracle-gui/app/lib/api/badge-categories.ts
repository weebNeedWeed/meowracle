import { useQuery } from "react-query";
import { apiClient, ApiResponse, noCacheSettings } from "./api-client";

export type BadgeCategory = {
  id: string;
  name: string;
};

export const fetchBadgeCategories = async (): Promise<
  ApiResponse<BadgeCategory[]>
> => {
  const data = await apiClient.get<ApiResponse<BadgeCategory[]>>(
    "/badge-categories"
  );
  return data;
};

export const useBadgeCategories = () => {
  return useQuery(
    ["badgeCategories"],
    () => fetchBadgeCategories(),
    noCacheSettings
  );
};

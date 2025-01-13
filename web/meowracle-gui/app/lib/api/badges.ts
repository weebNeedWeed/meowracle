import { useQuery } from "react-query";
import { apiClient, ApiResponse } from "./api-client";

export type Badge = {
  id: string;
  name: string;
  path: string;
  level: number;
};

export interface GetBadgesRequest {
  limit: number;
  keyword?: string;
  cursor?: any;
  categoryId?: string;
}

const fetchBadges = async (
  req: GetBadgesRequest
): Promise<ApiResponse<Badge[]>> => {
  const data = await apiClient.get<ApiResponse<Badge[]>>("/badges", {
    params: req,
  });
  return data;
};

export const useBadges = (req: GetBadgesRequest) => {
  return useQuery<ApiResponse<Badge[]>, Error>(
    ["badges", req.keyword, req.cursor, req.categoryId],
    () => fetchBadges(req),
    { cacheTime: 0 }
  );
};

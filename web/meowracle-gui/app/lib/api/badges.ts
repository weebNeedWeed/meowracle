import { useQuery } from "react-query";
import { apiClient, noCacheSettings } from "./api-client";

export type Badge = {
  id: string;
  name: string;
  path: string;
  level: number;
};

export interface GetBadgesRequest {
  limit: number;
  keyword?: string;
  cursor?: string;
  categoryId?: string;
}

export interface GetBadgesResponse {
  badges: Badge[];
  cursor: string;
}

const fetchBadges = async (
  req: GetBadgesRequest
): Promise<GetBadgesResponse> => {
  const data = await apiClient.get<GetBadgesResponse>("/badges", {
    params: req,
  });
  return data;
};

export const useBadges = (req: GetBadgesRequest) => {
  return useQuery<GetBadgesResponse, Error>(
    ["badges", req.keyword],
    () => fetchBadges(req),
    noCacheSettings
  );
};

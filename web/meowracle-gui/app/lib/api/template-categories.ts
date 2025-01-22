import { useQuery } from "react-query";
import { apiClient, ApiResponse, noCacheSettings } from "./api-client";

export type TemplateCategory = {
  id: string;
  name: string;
};

export const fetchTemplateCategories = async (): Promise<
  ApiResponse<TemplateCategory[]>
> => {
  const data = await apiClient.get<ApiResponse<TemplateCategory[]>>(
    "/template-categories"
  );
  return data;
};

export const useTemplateCategories = () => {
  return useQuery(
    ["templateCategories"],
    () => fetchTemplateCategories(),
    noCacheSettings
  );
};

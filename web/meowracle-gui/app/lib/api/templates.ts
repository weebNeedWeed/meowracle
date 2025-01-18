import { useQuery } from "react-query";
import { apiClient, ApiResponse } from "./api-client";

export type Template = {
  id: string;
  name: string;
  maxNumberOfSlots: number;
  previewPath: string;
};

export type GetTemplatesRequest = {
  limit: number;
  keyword?: string;
  cursor?: any;
  categoryId?: string;
  slots?: number;
};

const fetchTemplates = async (req: GetTemplatesRequest) => {
  const data = await apiClient.get<ApiResponse<Template[]>>("/templates", {
    params: req,
  });
  return data;
};

export const useTemplates = (req: GetTemplatesRequest) => {
  return useQuery<ApiResponse<Template[]>, Error>(
    [
      "templates",
      req.limit,
      req.keyword,
      req.cursor,
      req.categoryId,
      req.slots,
    ],
    () => fetchTemplates(req),
    { cacheTime: 0 }
  );
};

const fetchTemplateById = async (id: string) => {
  const data = await apiClient.get<ApiResponse<Template[]>>(`/templates/${id}`);
  return data;
};

export const useTemplate = (id: string) => {
  return useQuery<ApiResponse<Template[]>, Error>(
    ["template", id],
    () => fetchTemplateById(id),
    { cacheTime: 0 }
  );
};

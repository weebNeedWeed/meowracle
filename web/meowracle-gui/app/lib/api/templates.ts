import { useQuery } from "react-query";
import { apiClient, ApiResponse, noCacheSettings } from "./api-client";

export type Template = {
  id: string;
  name: string;
  maxNumberOfSlots: number;
  previewPath: string;
};

export type Slot = {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fillImage?: string;
};

export type Text = {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fillImage?: string;
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

export type FetchTemplatePathResponse = {
  path: {
    path: string;
  };
  slots: Slot[];
  texts: Text[];
};

const fetchTemplatePath = async (id: string, numberOfSlots: number) => {
  const data = await apiClient.get<ApiResponse<FetchTemplatePathResponse>>(
    `/templates/${id}/paths/${numberOfSlots}`
  );
  return data;
};

export const useTemplatePath = (id: string, numberOfSlots: number) => {
  return useQuery<ApiResponse<FetchTemplatePathResponse>, Error>(
    ["template", id, numberOfSlots],
    () => fetchTemplatePath(id, numberOfSlots),
    noCacheSettings
  );
};

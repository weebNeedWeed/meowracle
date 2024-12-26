import { useQuery } from "react-query";
import { apiClient } from "./api-client";
import { Slot } from "../definitions";

export type Template = {
  id: string;
  title: string;
  path: string;
  slots: Slot[];
};

const fetchTemplates = async () => {
  const data = await apiClient.get<Template[]>("/templates");
  return data;
};

export const useTemplates = () => {
  return useQuery<Template[], Error>(["templates"], () => fetchTemplates(), {
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};

const fetchTemplateById = async (id: string) => {
  const data = await apiClient.get<Template>(`/templates/${id}`);
  return data;
};

export const useTemplate = (id: string) => {
  return useQuery<Template, Error>(
    ["template", id],
    () => fetchTemplateById(id),
    {
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  );
};

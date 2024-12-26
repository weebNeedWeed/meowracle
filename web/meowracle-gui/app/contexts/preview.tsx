"use client";

import { createContext, useCallback, useContext, useState } from "react";

type PreviewContextType = {
  isPreviewActive: boolean;
  previewItem: string | null;
  setIsPreviewActive: (isPreviewActive: boolean) => void;
  setPreviewItem: (previewItem: string | null) => void;
  clearPreviewItem: () => void;
};

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [previewItem, setPreviewItem] = useState<string | null>(null);

  const clearPreviewItem = useCallback(() => {
    setIsPreviewActive(false);
    setPreviewItem(null);
  }, []);

  return (
    <PreviewContext.Provider
      value={{
        isPreviewActive,
        previewItem,
        setIsPreviewActive,
        setPreviewItem,
        clearPreviewItem,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
};

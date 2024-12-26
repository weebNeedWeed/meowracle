"use client";

import { createContext, useContext, useState } from "react";

type ChooseTemplateContextType = {
  chosenId: string;
  setChosenId: (value: string) => void;
};

const ChooseTemplateContext = createContext<ChooseTemplateContextType | null>(
  null
);

export function ChooseTemplateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chosenId, setChosenId] = useState("");
  return (
    <ChooseTemplateContext.Provider value={{ chosenId, setChosenId }}>
      {children}
    </ChooseTemplateContext.Provider>
  );
}

export const useChooseTemplate = () => {
  const context = useContext(ChooseTemplateContext);
  if (!context) {
    throw new Error(
      "useChooseTemplate must be used within a ChooseTemplateProvider"
    );
  }
  return context;
};

"use client";

import { createContext, useContext, useState } from "react";

type DragAndDropContextType = {
  isDragging: boolean;
  dragItem: string | null;
  setIsDragging: (isDragging: boolean) => void;
  setDragItem: (dragItem: string | null) => void;
};

const DragAndDropContext = createContext<DragAndDropContextType | null>(null);

export function DragAndDropContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragItem, setDragItem] = useState<string | null>(null);

  return (
    <DragAndDropContext.Provider
      value={{ isDragging, dragItem, setIsDragging, setDragItem }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
}

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);
  if (!context) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }
  return context;
};

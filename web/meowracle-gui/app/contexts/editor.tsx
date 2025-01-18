"use client";

import { createContext, useContext, useReducer } from "react";

type State = {
  dataUri?: string;
  isExporting: boolean;
  isFullscreen: boolean;

  editing?: {
    selectedTemplateId: string;
    slots: number;
    locked: boolean;
  };
};
const initialState: State = { isExporting: false, isFullscreen: false };

export type EditorAction =
  | { type: "SET_IS_EXPORTING"; isExporting: boolean }
  | { type: "TOGGLE_FULLSCREEN" }
  | { type: "SELECT_TEMPLATE"; templateId: string; slots: number }
  | { type: "TOGGLE_LOCK_TEMPLATE" };

type ContextType = { state: State; dispatch: (action: EditorAction) => void };

const EditorContext = createContext<ContextType>({} as ContextType);

const reducer = (state: State, action: EditorAction) => {
  switch (action.type) {
    case "SET_IS_EXPORTING": {
      return { ...state, isExporting: action.isExporting };
    }
    case "TOGGLE_FULLSCREEN": {
      return { ...state, isFullscreen: !state.isFullscreen };
    }
    case "SELECT_TEMPLATE": {
      return {
        ...state,
        editing: {
          locked: false,
          selectedTemplateId: action.templateId,
          slots: action.slots,
        },
      };
    }
    case "TOGGLE_LOCK_TEMPLATE": {
      if (!state.editing) return state;
      return {
        ...state,
        editing: {
          ...state.editing,
          locked: !state.editing.locked,
        },
      };
    }
    default:
      return state;
  }
};

export const EditorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context;
};

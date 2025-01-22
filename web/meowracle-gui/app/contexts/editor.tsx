"use client";

import { createContext, useContext, useReducer } from "react";
import { Template } from "../lib/api/templates";

export type ChangingPropertiesElementType = "template" | "slot";

type State = {
  dataUri?: string;
  isFullscreen: boolean;

  exporting?: {
    isHd: boolean;
    format: "jpeg" | "png";
  };

  editing?: {
    selectedTemplate: Template;
    slots: number;
    locked: boolean;
  };

  changingProperties?: {
    elementType: ChangingPropertiesElementType;
    selectedElement?: any;
  };

  dragging?: {
    badgeImage: string;
    position?: { x: number; y: number };
  };

  deletingSlot?: {
    slotIndex: number;
  };
};
const initialState: State = { isFullscreen: false };

export type EditorAction =
  | { type: "SET_IS_EXPORTING"; isHd: boolean; format: "jpeg" | "png" }
  | { type: "CLEAR_EXPORTING" }
  | { type: "TOGGLE_FULLSCREEN" }
  | { type: "SELECT_TEMPLATE"; template: Template; slots: number }
  | { type: "UPDATE_NUMBER_OF_SLOTS"; slots: number }
  | { type: "TOGGLE_LOCK_TEMPLATE" }
  | { type: "SET_LOCK_STATUS"; status: boolean }
  | {
      type: "SET_CHANGING_PROPERTIES";
      elementType: ChangingPropertiesElementType;
      selectedElement?: any;
    }
  | { type: "CLEAR_CHANGING_PROPERTIES" }
  | { type: "SET_DRAGGING"; badgeImage: string }
  | { type: "SET_DROPPING_POSITION"; x: number; y: number }
  | { type: "CLEAR_DRAGGING" }
  | { type: "SET_DELETING_SLOT"; slotIndex: number }
  | { type: "CLEAR_DELETING_SLOT" };

type ContextType = { state: State; dispatch: (action: EditorAction) => void };

const EditorContext = createContext<ContextType>({} as ContextType);

const reducer = (state: State, action: EditorAction) => {
  switch (action.type) {
    case "SET_IS_EXPORTING": {
      return {
        ...state,
        exporting: {
          isHd: action.isHd,
          format: action.format,
        },
      };
    }
    case "CLEAR_EXPORTING": {
      return {
        ...state,
        exporting: undefined,
      };
    }
    case "TOGGLE_FULLSCREEN": {
      return { ...state, isFullscreen: !state.isFullscreen };
    }
    case "SELECT_TEMPLATE": {
      return {
        ...state,
        editing: {
          locked: false,
          slots: action.slots,
          selectedTemplate: action.template,
        },
      };
    }
    case "UPDATE_NUMBER_OF_SLOTS": {
      if (!state.editing) return state;
      return {
        ...state,
        editing: {
          ...state.editing,
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
    case "SET_LOCK_STATUS": {
      if (!state.editing) return state;
      return {
        ...state,
        editing: {
          ...state.editing,
          locked: action.status,
        },
      };
    }
    case "SET_CHANGING_PROPERTIES": {
      return {
        ...state,
        changingProperties: {
          elementType: action.elementType,
          selectedElement: action.selectedElement,
        },
      };
    }
    case "CLEAR_CHANGING_PROPERTIES": {
      return {
        ...state,
        changingProperties: undefined,
      };
    }
    case "SET_DRAGGING": {
      return {
        ...state,
        dragging: {
          badgeImage: action.badgeImage,
        },
      };
    }
    case "SET_DROPPING_POSITION": {
      if (!state.dragging) return state;
      return {
        ...state,
        dragging: {
          ...state.dragging,
          position: {
            x: action.x,
            y: action.y,
          },
        },
      };
    }
    case "CLEAR_DRAGGING": {
      return {
        ...state,
        dragging: undefined,
      };
    }
    case "SET_DELETING_SLOT": {
      return {
        ...state,
        deletingSlot: {
          slotIndex: action.slotIndex,
        },
      };
    }
    case "CLEAR_DELETING_SLOT": {
      return {
        ...state,
        changingProperties: undefined,
        deletingSlot: undefined,
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

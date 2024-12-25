export type Slot = {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fillImage?: string;
};

// utility types
export type ClipPosition =
  | "left-top"
  | "left-middle"
  | "left-bottom"
  | "center-top"
  | "center-middle"
  | "center-bottom"
  | "right-top"
  | "right-middle"
  | "right-bottom"
  | "scale";

export type Size = { width: number; height: number };

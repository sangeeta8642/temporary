import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";
import { Dispatch, SetStateAction } from "react";

import { FILTERS } from "./constants";

export const FONTS = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const COLORS = [
  material.red[500],
  material.pink[500],
  material.purple[500],
  material.deepPurple[500],
  material.indigo[500],
  material.blue[500],
  material.lightBlue[500],
  material.cyan[500],
  material.teal[500],
  material.green[500],
  material.lightGreen[500],
  material.lime[500],
  material.yellow[500],
  material.amber[500],
  material.orange[500],
  material.deepOrange[500],
  material.brown[500],
  material.blueGrey[500],
  "transparent",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export type Filter = (typeof FILTERS)[number];

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  width: 400,
  height: 400,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  width: 600,
  height: 600,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  width: 400,
  height: 400,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export type buildEditorProps = {
  save: (skip?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  autoZoom: () => void;
  copy: () => void;
  paste: () => void;
  canvas: fabric.Canvas;
  strokeDashArray: number[];
  setStrokeDashArray: Dispatch<SetStateAction<number[]>>;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  fontFamily: string;
  selectedObjects: fabric.Object[];
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setFontFamily: (value: string) => void;
};

export interface Editor {
  savePng: () => void;
  saveSvg: () => void;
  saveJpg: () => void;
  saveJson: () => void;
  loadJson: (json: string) => void;
  save: (skip?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  autoZoom: () => void;
  changeSize: (value: { width: number; height: number }) => void;
  changeBackground: (value: string) => void;
  enableDrawMode: () => void;
  disableDrawMode: () => void;
  copy: () => void;
  paste: () => void;
  changeImageFilter: (value: Filter) => void;
  addImage: (url: string) => void;
  delete: () => void;
  bringForward: () => void;
  sendBackwards: () => void;
  getActiveFontFamily: () => string;
  getActiveOpacity: () => number;
  getActiveFontStyle: () => string;
  getActiveTextAlign: () => string;
  getActiveFontSize: () => number;
  getActiveFontLinethrough: () => boolean;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveFontUnderline: () => boolean;
  getActiveFontWeight: () => number;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  addText: (value: string, options?: ITextboxOptions) => void;
  changeFillColor: (value: string) => void;
  changeOpacity: (value: number) => void;
  changeTextAlign: (value: string) => void;
  changeFontSize: (value: number) => void;
  changeFontStyle: (value: string) => void;
  changeFontLinethrough: (value: boolean) => void;
  changeFontUnderline: (value: boolean) => void;
  changeStrokeWidth: (value: number) => void;
  changeFontWeight: (value: number) => void;
  changeStrokeColor: (value: string) => void;
  changeFontFamily: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriagle: () => void;
  addInverseTriagle: () => void;
  addDiamond: () => void;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  canvas: fabric.Canvas;

  selectedObjects: fabric.Object[];
}

import * as material from "material-colors";
import { Lato } from "next/font/google";

import { ActiveTool } from "./type";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export const WORKSPACE_NAME = "clip";
export const WORKSPACE_WIDTH = 900;
export const WORKSPACE_HEIGHT = 1200;

export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_WEIGHT = 400;
export const FONT_SIZE = 32;
export const FONT_STYLE = "normal";
export const FONT_LINETHROUGH = false;
export const FONT_UNDERLINE = false;
export const TEXT_ALIGN = "left";

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
  "Roboto",
  "Lato"
] as const;

export const FILTERS = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
] as const;

export const CIRCLE_OPTIONS = {
  radius: 200,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  width: 400,
  height: 400,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  width: 400,
  height: 400,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  width: 550,
  height: 550,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

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

export const SELECTION_DEPENDENT_TOOLS: ActiveTool[] = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const JSON_PROPERTY_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];

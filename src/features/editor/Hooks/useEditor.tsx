"use client";
import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";
import { useAutoResize } from "@/features/editor/Hooks/useAutoResize";
import { buildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, FILL_COLOR, Filter, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_WIDTH, TEXT_OPTIONS, TRIANGLE_OPTIONS } from "../type";
import { useCanvasEvents } from "@/features/editor/Hooks/useCanvasEvents";
import { JSON_PROPERTY_KEYS, STROKE_DASH_ARRAY } from "../constants";
import { useClipboard } from "@/features/editor/Hooks/useClipboard";
import { useHistory } from "@/features/editor/Hooks/useHistory";
import { useHotkeys } from "@/features/editor/Hooks/useHotKeys";
import {
  createFilter,
  downloadFile,
  generateSaveOptions,
  getWorkspace,
  isImageType,
  isTextType
} from '../utils';
import { useWindowEvents } from '@/features/editor/Hooks/useWindowEvents';

type UseEditorProps = {
  clearSelectionCallback?: () => void;
};

export const useEditor = ({ clearSelectionCallback }: UseEditorProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])


  const [fontFamily, setFontFamily] = useState(FONT_FAMILY)
  const [fillColor, setFillColor] = useState(FILL_COLOR)
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);


  const { copy, paste } = useClipboard({ canvas });

  const { autoZoom } = useAutoResize({ canvas, container });

  const { save, canRedo, canUndo, redo, undo, canvasHistory, setHistoryIndex } = useHistory({ canvas });

  useHotkeys({
    canvas,
    copy,
    paste,
    redo,
    save,
    undo
  });

  useCanvasEvents({
    save,
    canvas,
    setSelectedObjects,
    clearSelectionCallback
  })

  useWindowEvents();

  const buildEditor = ({
    save,
    undo,
    redo,
    canUndo,
    autoZoom,
    copy,
    paste,
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    fontFamily,
    setFillColor,
    setStrokeColor,
    setStrokeWidth,
    selectedObjects,
    setFontFamily,
    strokeDashArray,
    setStrokeDashArray
  }: buildEditorProps): Editor => {

    const getWorkspace = () => {
      return canvas.getObjects().find((object) => object.name === "clip")
    }

    const center = (object: fabric.Object) => {
      const workspace = getWorkspace()
      const center = workspace?.getCenterPoint()

      //@ts-ignore
      canvas._centerObject(object, center)
    }

    const addToCenter = (object: fabric.Object) => {
      center(object)
      canvas.add(object)
      canvas.setActiveObject(object)

    }

    const savePng = () => {
      const options = generateSaveOptions(canvas);

      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, 'png');

      autoZoom();
    };

    /**
     * Saves the canvas as a SVG.
     */
    const saveSvg = () => {
      const options = generateSaveOptions(canvas);

      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, 'svg');

      autoZoom();
    };

    /**
     * Saves the canvas as a JPG.
     */
    const saveJpg = () => {
      const options = generateSaveOptions(canvas);

      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, 'jpg');

      autoZoom();
    };

    /**
     * Saves the canvas as a JSON.
     */
    const saveJson = () => {
      const currentState = canvas.toJSON(JSON_PROPERTY_KEYS);
      const currentStateJson = JSON.stringify(currentState, null, '\t');

      const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(currentStateJson)}`;
      downloadFile(fileString, 'json');
    };

    /**
     * Loads the canvas from a JSON.
     */
    const loadJson = (json: string) => {
      const data = JSON.parse(json);

      canvas.loadFromJSON(data, () => {
        autoZoom();
      });
    };



    return {
      savePng,
      saveSvg,
      saveJpg,
      saveJson,
      loadJson,
      save,
      undo,
      redo,
      canUndo,
      canRedo,
      autoZoom,
      zoomOut: () => {
        let zoomRatio = canvas.getZoom();
        zoomRatio -= 0.05;
        zoomRatio = zoomRatio < 0.2 ? 0.2 : zoomRatio;

        const center = canvas.getCenter();

        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
      },

      /**
       * Zooms in to the workspace.
       */
      zoomIn: () => {
        let zoomRatio = canvas.getZoom();
        zoomRatio += 0.05;
        zoomRatio = zoomRatio > 1.5 ? 1.5 : zoomRatio;

        const center = canvas.getCenter();

        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
      },
      changeSize: (value: { width: number; height: number }) => {
        const workspace = getWorkspace();

        workspace?.set(value);
        autoZoom();

        // TODO: Save functionality
      },

      /**
       * Changes the workspace background.
       */
      changeBackground: (value: string) => {
        const workspace = getWorkspace();

        workspace?.set({ fill: value });
        canvas.renderAll();

        // TODO: Save functionality
      },
      enableDrawMode: () => {
        canvas.discardActiveObject();
        canvas.renderAll();

        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = strokeWidth;
        canvas.freeDrawingBrush.color = strokeColor;
      },

      /**
       * Disables the drawing mode.
       */
      disableDrawMode: () => {
        canvas.isDrawingMode = false;
      },
      changeImageFilter: (value: Filter) => {
        selectedObjects.forEach((object) => {
          if (isImageType(object.type)) {
            const imageObject = object as fabric.Image;

            const effect = createFilter(value);

            imageObject.filters = effect ? [effect] : [];
            imageObject.applyFilters();
            canvas.renderAll();
          }
        });
      },
      addImage: (url: string) => {

        fabric.Image.fromURL(url, (image) => {
          const workspace = getWorkspace();

          image.scaleToWidth(workspace?.width ?? 0);
          image.scaleToHeight(workspace?.height ?? 0);

          addToCenter(image);
        }, { crossOrigin: 'anonymous' });
      },

      bringForward: () => {
        canvas.getActiveObjects().forEach((object) => {
          canvas.bringForward(object)
        })

        canvas.renderAll()

        const workSpace = getWorkspace()
        workSpace?.sendToBack()
      },
      sendBackwards: () => {
        canvas.getActiveObjects().forEach((object) => {
          canvas.sendBackwards(object)
        })

        canvas.renderAll()
        const workSpace = getWorkspace()
        workSpace?.sendToBack()
      },
      delete: () => {
        canvas.getActiveObjects().forEach((object) => canvas.remove(object))
        canvas.discardActiveObject()
        canvas.renderAll()
      },
      addText: (value, options) => {
        const object = new fabric.Textbox(value, {
          ...TEXT_OPTIONS,
          fill: fillColor,
          ...options
        })

        addToCenter(object)
      },
      changeStrokeDashArray: (value: number[]) => {
        setStrokeDashArray(value);

        canvas.getActiveObjects().forEach((object) => object.set({ strokeDashArray: value }));
        canvas.renderAll();
      },
      changeStrokeColor: (value: string) => {
        setStrokeColor(value);

        canvas.getActiveObjects().forEach((object) => {
          // Text types don't have stroke
          if (isTextType(object.type)) {
            object.set({ fill: value });

            return;
          }

          object.set({ stroke: value });
        });

        canvas.renderAll();
      },
      changeOpacity: (value) => {
        canvas.getActiveObjects().forEach((object) => {
          object.set({ opacity: value })
        })
      },
      changeFillColor: (value: string) => {
        setFillColor(value)
        canvas.getActiveObjects().forEach((obj) => {
          obj.set({ fill: value })
        })
        canvas.renderAll()
      },
      changeFontLinethrough: (value: boolean) => {
        canvas.getActiveObjects().forEach((obj) => {
          if (isTextType(obj.type)) {
            obj._set("linethrough", value)
          }
        })
        canvas.renderAll()
      },
      changeFontUnderline: (value: boolean) => {
        canvas.getActiveObjects().forEach((obj) => {
          if (isTextType(obj.type)) {
            obj._set("underline", value)
          }
        })
        canvas.renderAll()
      },
      changeTextAlign: (value: string) => {
        canvas.getActiveObjects().forEach((obj) => {
          if (isTextType(obj.type)) {
            obj._set("textAlign", value)
          }
        })
        canvas.renderAll()
      },
      changeFontSize: (value: number) => {
        canvas.getActiveObjects().forEach((obj) => {
          if (isTextType(obj.type)) {
            obj._set("fontSize", value)
          }
        })
        canvas.renderAll()
      },
      changeFontStyle: (value: string) => {
        canvas.getActiveObjects().forEach((obj) => {
          if (isTextType(obj.type)) {
            obj._set("fontStyle", value)
          }
        })
        canvas.renderAll()
      },
      changeFontWeight: (value: number) => {
        selectedObjects.forEach((object) => {
          if (isTextType(object.type)) {
            // @ts-ignore
            object.set({ fontWeight: value });
          }
        })
        canvas.renderAll()
      },
      changeFontFamily: (value: string) => {
        setFontFamily(value)
        canvas.getActiveObjects().forEach((obj) => {
          if (isTextType(obj.type)) {
            obj._set("fontFamily", value)
          }
        })
        canvas.renderAll()
      },

      changeStrokeWidth: (value: number) => {
        setStrokeWidth(value)
        canvas.getActiveObjects().forEach((obj) => {
          obj.set({ strokeWidth: value })
        })
        canvas.renderAll()
      },
      // changeStrokeColor: (value: string) => {
      //   setStrokeColor(value)
      //   canvas.getActiveObjects().forEach((obj) => {
      //     if (isTextType(obj.type)) {
      //       obj.set({ fill: value })
      //       return
      //     }
      //     obj.set({ stroke: value })
      //   })
      //   canvas.renderAll()
      // },
      addCircle: () => {
        const object = new fabric.Circle({
          ...CIRCLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        })
        addToCenter(object)
      },
      addSoftRectangle: () => {
        const object = new fabric.Rect({
          ...RECTANGLE_OPTIONS,
          rx: 50,
          ry: 50,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        })
        addToCenter(object)
      },
      addRectangle: () => {
        const object = new fabric.Rect({
          ...RECTANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        })
        addToCenter(object)
      },
      addTriagle: () => {
        const object = new fabric.Triangle({
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        })
        addToCenter(object)
      },
      addInverseTriagle: () => {
        const WIDTH = TRIANGLE_OPTIONS.width
        const HEIGHT = TRIANGLE_OPTIONS.height
        const object = new fabric.Polygon([
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT }
        ], {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        })
        addToCenter(object)
      },
      addDiamond: () => {
        const WIDTH = DIAMOND_OPTIONS.width
        const HEIGHT = DIAMOND_OPTIONS.height
        const object = new fabric.Polygon([
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 }
        ], {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        })
        addToCenter(object)
      },
      canvas,
      getActiveFillColor: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
          return fillColor;
        }

        const value = selectedObject.get('fill') || fillColor;

        // Currently gradiants and patterns are not used
        return value as string;
      },
      getActiveStrokeColor: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
          return strokeColor;
        }

        return selectedObject.get('stroke') || strokeColor;
      },
      getActiveFontStyle: () => {
        const selectedObject = selectedObjects[0]

        if (!selectedObject) {
          return "normal"
        }
        //@ts-ignore
        const value = selectedObject.get("fontStyle") || "normal"

        return value

      },
      getActiveFontLinethrough: () => {
        const selectedObject = selectedObjects[0]

        if (!selectedObject) {
          return false
        }
        //@ts-ignore
        const value = selectedObject.get("linethrough") || false

        return value

      },
      getActiveFontUnderline: () => {
        const selectedObject = selectedObjects[0]

        if (!selectedObject) {
          return false
        }
        //@ts-ignore
        const value = selectedObject.get("underline") || false

        return value

      },
      getActiveTextAlign: () => {
        const selectedObject = selectedObjects[0]

        if (!selectedObject) {
          return "left"
        }
        //@ts-ignore
        const value = selectedObject.get("textAlign") || "left"

        return value

      },
      getActiveFontSize: () => {
        const selectedObject = selectedObjects[0]

        if (!selectedObject) {
          return FONT_SIZE
        }
        //@ts-ignore
        const value = selectedObject.get("fontSize") || FONT_SIZE

        return value

      },
      getActiveFontWeight: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
          return FONT_WEIGHT;
        }

        // @ts-ignore
        return selectedObject.get('fontWeight') || FONT_WEIGHT;
      },
      getActiveFontFamily: () => {
        const selectedObject = selectedObjects[0]

        if (!selectedObject) {
          return fontFamily
        }
        //@ts-ignore
        const value = selectedObject.get("fontFamily") || fontFamily

        return value

      },
      getActiveStrokeWidth: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
          return strokeWidth;
        }

        return selectedObject.get('strokeWidth') || strokeWidth;
      },

      /**
       * Gets the active stroke dash array.
       */
      getActiveStrokeDashArray: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
          return strokeDashArray;
        }

        return selectedObject.get('strokeDashArray') || strokeDashArray;
      },
      getActiveOpacity: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
          return 1;
        }

        const value = selectedObject.get("opacity") || 1
        return value
      },
      copy,
      paste,
      fillColor,
      strokeColor,
      strokeWidth,
      selectedObjects
    }
  }

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        save,
        undo,
        redo,
        canUndo,
        canRedo,
        autoZoom,
        copy,
        paste,
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        selectedObjects,
        fontFamily,
        setFontFamily,
        setStrokeDashArray,
        strokeDashArray,
      })
    }

    return undefined;

  }, [
    autoZoom,
    canRedo,
    canUndo,
    canvas,
    copy,
    fillColor,
    fontFamily,
    paste,
    redo,
    save,
    selectedObjects,
    strokeColor,
    strokeDashArray,
    strokeWidth,
    undo
  ])

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#fff",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      console.log(initialContainer.offsetWidth, initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
      const currentState = initialCanvas.toJSON(JSON_PROPERTY_KEYS);
      const currentStateJson = JSON.stringify(currentState);

      canvasHistory.current = [currentStateJson];
      setHistoryIndex(0);
    }, [canvasHistory, setHistoryIndex]);

  return { init, editor };
};

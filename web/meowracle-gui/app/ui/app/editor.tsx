"use client";

import { Layer, Rect, Stage } from "react-konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import EditorControlBottom from "./editor-control-bottom";
import EditorControlTop from "./editor-control-top";
import { useEffect, useRef } from "react";
import { useEditorContext } from "@/app/contexts/editor";
import { Stage as StageType } from "konva/lib/Stage";
import { downloadURI } from "@/app/lib/utils";
import { Container } from "@mantine/core";

const defaultWidth = 1584;
const defaultHeight = 396;

export default function Editor() {
  const {
    state: { isExporting },
    dispatch: editorDispatch,
  } = useEditorContext();

  const stageRef = useRef<StageType>(null);

  // handle when isExporting is true
  // convert the canvas to dataUri
  // and download the image
  useEffect(() => {
    console.log("isExporting", isExporting);
    if (isExporting && stageRef.current) {
      const dataUri = stageRef.current.toDataURL();
      downloadURI(dataUri, "linkedin-cover.png");

      // set isExporting to false
      // after downloading the image
      editorDispatch({ type: "SET_IS_EXPORTING", isExporting: false });
    }
  }, [isExporting, editorDispatch]);

  return (
    <Container
      size="xl"
      className="grow bg-transparent shrink overflow-hidden h-full flex flex-col items-center justify-center relative"
    >
      <TransformWrapper
        initialScale={1}
        disablePadding
        pinch={{ disabled: true }}
        wheel={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        <div className="text-sm self-start mb-1 text-[#6A6A79]">
          Linkedin 1584x396
        </div>
        <div className="w-full flex bg-[#26262E] mb-10 h-[396px]">
          <TransformComponent>
            <Stage ref={stageRef} width={defaultWidth} height={defaultHeight}>
              <Layer>
                <Rect
                  x={20}
                  y={20}
                  width={100}
                  height={50}
                  fill="#4ade80"
                  stroke="#1e293b"
                  strokeWidth={4}
                />
                <Rect
                  x={150}
                  y={40}
                  width={100}
                  height={50}
                  fill="#f87171"
                  shadowBlur={10}
                  cornerRadius={10}
                />
                <Rect
                  x={50}
                  y={120}
                  width={100}
                  height={100}
                  fill="#60a5fa"
                  cornerRadius={[0, 10, 20, 30]}
                />
              </Layer>
            </Stage>
          </TransformComponent>
        </div>

        <EditorControlTop />
        <EditorControlBottom />
      </TransformWrapper>
    </Container>
  );
}

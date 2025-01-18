"use client";

import { Layer, Image, Stage } from "react-konva";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import EditorControlBottom from "./editor-control-bottom";
import EditorControlTop from "./editor-control-top";
import { useEffect, useRef } from "react";
import { useEditorContext } from "@/app/contexts/editor";
import { Stage as StageType } from "konva/lib/Stage";
import { downloadURI } from "@/app/lib/utils";
import { Container } from "@mantine/core";
import useImage from "use-image";
import { useElementSize } from "@mantine/hooks";
import { FaLock, FaLockOpen, FaPen } from "react-icons/fa6";

const defaultWidth = 1584;
const defaultHeight = 396;

export default function Editor() {
  const {
    state: { isExporting, editing },
    dispatch: editorDispatch,
  } = useEditorContext();

  const { ref, width } = useElementSize();
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
      ref={ref}
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
        <ContainerResizeCenterView width={width} />

        <div className="mb-1 flex items-center justify-between w-full">
          <span className="text-sm text-[#6A6A79]">Linkedin 1584x396</span>

          {editing && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  editorDispatch({ type: "TOGGLE_LOCK_TEMPLATE" });
                }}
                className="text-sm text-[#6A6A79] hover:text-[#8A8A99] flex gap-x-2 items-center"
              >
                {editing?.locked ? (
                  <FaLock className="w-3 h-3 text-[#1BE4C9]" />
                ) : (
                  <FaLockOpen className="w-3 h-3" />
                )}
                {editing?.locked ? (
                  <span className="text-[#1BE4C9]">Locked</span>
                ) : (
                  "Lock"
                )}
              </button>

              <span className="text-md text-[#6A6A79]">|</span>

              <button className="text-sm text-[#6A6A79] hover:text-[#8A8A99] flex gap-x-2 items-center">
                <FaPen className="w-3 h-3" />
                Edit template&apos;s properties
              </button>
            </div>
          )}
        </div>

        <div className="w-full flex bg-[#26262E] mb-10 h-[396px]">
          <TransformComponent>
            <Stage ref={stageRef} width={defaultWidth} height={defaultHeight}>
              {editing && (
                <ImageEditLayer imagePath={"/templates/example-template.png"} />
              )}
            </Stage>
          </TransformComponent>
        </div>

        <EditorControlTop />
        <EditorControlBottom />
      </TransformWrapper>
    </Container>
  );
}

function ContainerResizeCenterView({ width }: { width: number }) {
  const { centerView, instance } = useControls();
  useEffect(() => {
    centerView(instance.transformState.previousScale);
  }, [width, centerView, instance.transformState.previousScale]);
  return null;
}

function ImageEditLayer({ imagePath }: { imagePath: string }) {
  const [image] = useImage(imagePath);
  return (
    <Layer>
      <Image alt="a" x={0} y={0} width={1584} height={396} image={image} />
    </Layer>
  );
}

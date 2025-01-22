"use client";

import { Layer, Image, Stage } from "react-konva";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import EditorControlBottom from "./editor-control-bottom";
import { Fragment, useEffect, useRef, useState } from "react";
import { useEditorContext } from "@/app/contexts/editor";
import { Stage as StageType } from "konva/lib/Stage";
import { downloadURI } from "@/app/lib/utils";
import { Container } from "@mantine/core";
import useImage from "use-image";
import { useElementSize } from "@mantine/hooks";
import { FaLock, FaLockOpen, FaPen } from "react-icons/fa6";
import { Slot, useTemplatePath } from "@/app/lib/api/templates";
import EmptySlot from "./empty-slot";

const defaultWidth = 1584;
const defaultHeight = 396;

export default function Editor() {
  const {
    state: { exporting, editing, isFullscreen, dragging },
    dispatch: editorDispatch,
  } = useEditorContext();

  const { ref, width } = useElementSize();
  const stageRef = useRef<StageType>(null);

  // handle when isExporting is true
  // convert the canvas to dataUri
  // and download the image
  useEffect(() => {
    if (exporting && stageRef.current) {
      editorDispatch({ type: "CLEAR_CHANGING_PROPERTIES" });
      editorDispatch({ type: "SET_LOCK_STATUS", status: true });

      setTimeout(() => {
        const dataUri = stageRef.current!.toDataURL({
          pixelRatio: exporting.isHd ? 2 : 1,
          mimeType: `image/${exporting.format}`,
          quality: 1,
        });
        const ext = exporting.format === "jpeg" ? "jpg" : "png";
        downloadURI(dataUri, "linkedin-cover-image." + ext);

        // set isExporting to false
        // after downloading the image
        // prevent the user from spamming
        setTimeout(() => {
          editorDispatch({ type: "CLEAR_EXPORTING" });
          editorDispatch({ type: "SET_LOCK_STATUS", status: false });
        }, 1500);
      }, 500);
    }
  }, [exporting, editorDispatch]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!stageRef.current) {
      return;
    }

    if (!dragging) {
      return;
    }

    stageRef.current.setPointersPositions(e);
    if (!stageRef.current.getPointerPosition()) {
      return;
    }

    // delegate handling function to the EditLayers component
    editorDispatch({
      type: "SET_DROPPING_POSITION",
      x: stageRef.current.getPointerPosition()!.x,
      y: stageRef.current.getPointerPosition()!.y,
    });
  };

  return (
    <Container
      ref={ref}
      size={isFullscreen ? "xl" : "lg"}
      className="grow bg-transparent shrink overflow-hidden h-full flex flex-col items-center justify-center relative"
    >
      <TransformWrapper
        initialScale={1}
        disablePadding
        pinch={{ disabled: true }}
        wheel={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        <div className="mb-1 flex items-center justify-between w-full">
          <span className="text-sm text-[#6A6A79]">Linkedin 1584x396</span>

          <KeepScrollPosition width={width} stageRef={stageRef} />

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
                  <span className="text-[#1BE4C9] hover:text-[#30F5DA]">
                    Locked
                  </span>
                ) : (
                  "Lock"
                )}
              </button>

              <span className="text-md text-[#6A6A79]">|</span>

              <button
                onClick={() => {
                  editorDispatch({
                    type: "SET_CHANGING_PROPERTIES",
                    elementType: "template",
                  });
                }}
                className="text-sm text-[#6A6A79] hover:text-[#8A8A99] flex gap-x-2 items-center"
              >
                <FaPen className="w-3 h-3" />
                Edit template&apos;s properties
              </button>
            </div>
          )}
        </div>

        <div className="w-full flex bg-[#26262E] mb-10 h-[396px]">
          <TransformComponent>
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
              <Stage ref={stageRef} width={defaultWidth} height={defaultHeight}>
                {editing && (
                  <EditLayers
                    templateId={editing.selectedTemplate.id}
                    numberOfSlots={editing.slots}
                  />
                )}
              </Stage>
            </div>
          </TransformComponent>
        </div>

        {/* <EditorControlTop /> */}
        <EditorControlBottom />
      </TransformWrapper>
    </Container>
  );
}

// Keep the scroll position of the canvas
// when the user drag and drop the badges (because of the re-render caused by the state change)
function KeepScrollPosition({
  width,
  stageRef,
}: {
  width: number;
  stageRef: React.RefObject<StageType | null>;
}) {
  const { setTransform, instance, resetTransform } = useControls();
  const { state } = useEditorContext();
  const [oldPos, setOldPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    resetTransform();
  }, [width]);

  useEffect(() => {
    setOldPos({
      x: instance.transformState.positionX,
      y: instance.transformState.positionY,
    });
  }, [state, stageRef]);

  useEffect(() => {
    setTransform(oldPos.x, oldPos.y, instance.transformState.scale);
  }, [oldPos]);

  return null;
}

function EditLayers({
  templateId,
  numberOfSlots,
}: {
  templateId: string;
  numberOfSlots: number;
}) {
  const { data: templatePath } = useTemplatePath(templateId, numberOfSlots);
  const {
    state: { dragging, changingProperties, deletingSlot, editing },
    dispatch: editorDispatch,
  } = useEditorContext();

  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    if (!templatePath) return;
    setSlots(templatePath.data.slots);
  }, [templatePath]);

  useEffect(() => {
    if (!dragging || !dragging.position) return;

    if (editing?.locked) return;

    const matchedSlotIndex = slots.findIndex((s) => {
      return (
        dragging.position!.x >= s.x &&
        dragging.position!.x <= s.x + s.width &&
        dragging.position!.y >= s.y &&
        dragging.position!.y <= s.y + s.height
      );
    });

    if (matchedSlotIndex === -1) return;

    const newSlots = [...slots];
    newSlots[matchedSlotIndex].fillImage = dragging.badgeImage;

    setSlots(newSlots);
  }, [dragging]);

  useEffect(() => {
    if (!deletingSlot) return;

    const newSlots = [...slots];
    const slot = newSlots.find((s) => s.index === deletingSlot.slotIndex);
    if (!slot) return;

    slot.fillImage = undefined;
    setSlots(newSlots);

    editorDispatch({ type: "CLEAR_DELETING_SLOT" });
  }, [deletingSlot]);

  if (!templatePath) return null;

  const selectSlot = (slotIndex: number) => {
    if (editing?.locked) return;
    editorDispatch({
      type: "SET_CHANGING_PROPERTIES",
      elementType: "slot",
      selectedElement: slotIndex,
    });
  };

  return (
    <>
      <Layer>
        <BackgroundImageDisplay imagePath={templatePath.data.path.path} />
      </Layer>

      <Layer>
        {slots.map((slot) => (
          <EmptySlot
            key={slot.index}
            slot={slot}
            onSelect={() => selectSlot(slot.index)}
            isLocked={editing?.locked ?? false}
            isSelected={
              changingProperties?.elementType === "slot" &&
              changingProperties?.selectedElement === slot.index
            }
          />
        ))}
      </Layer>
    </>
  );
}

function BackgroundImageDisplay({ imagePath }: { imagePath: string }) {
  const [image] = useImage(imagePath, "anonymous");
  return <Image alt="a" x={0} y={0} width={1584} height={396} image={image} />;
}

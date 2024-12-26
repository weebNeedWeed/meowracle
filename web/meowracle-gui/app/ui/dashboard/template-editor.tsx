"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Layer, Rect, Stage, Text, Label, Tag } from "react-konva";
import { Slot } from "@/app/lib/definitions";
import Konva from "konva";
import { useDragAndDrop } from "@/app/contexts/drag-and-drop";
import { Box } from "@mantine/core";
import { useChooseTemplate } from "@/app/contexts/choose-template";
import { useTemplate } from "@/app/lib/api/templates";
import EmptySlot from "./empty-slot";
import useImage from "use-image";
import { usePreview } from "@/app/contexts/preview";

export default function TemplateEditor() {
  const stageRef = useRef<Konva.Stage>(null);
  const [slots, setSlots] = useState<Slot[]>([]);

  const { dragItem, isDragging, clearDragItem } = useDragAndDrop();
  const { chosenId } = useChooseTemplate();
  const { isPreviewActive, setPreviewItem, clearPreviewItem } = usePreview();

  // Generate preview image when preview is active
  useEffect(() => {
    if (isPreviewActive && stageRef.current) {
      const t = setTimeout(() => {
        setPreviewItem(
          stageRef.current!.toDataURL({
            mimeType: "image/jpeg",
            pixelRatio: 3,
            quality: 1,
          })
        );
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isPreviewActive, setPreviewItem, clearPreviewItem]);

  const putImageOntoStage = useCallback(
    (pos: Konva.Vector2d) => {
      const selectedSlotIndex = slots.findIndex((slot) => {
        return (
          pos.x >= slot.x &&
          pos.x <= slot.x + slot.width &&
          pos.y >= slot.y &&
          pos.y <= slot.y + slot.height
        );
      });

      if (selectedSlotIndex === -1) {
        clearDragItem();
        return;
      }

      const newSlots = [...slots];
      newSlots[selectedSlotIndex].fillImage = dragItem!;
      setSlots(newSlots);
      clearDragItem();
    },
    [dragItem, clearDragItem, slots]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!stageRef.current) {
        return;
      }

      if (!isDragging || !dragItem) {
        return;
      }

      stageRef.current.setPointersPositions(e);
      if (!stageRef.current.getPointerPosition()) {
        return;
      }

      putImageOntoStage(stageRef.current.getPointerPosition()!);
    },
    [isDragging, dragItem, putImageOntoStage]
  );

  return (
    <div className="overflow-x-scroll w-full h-full justify-start flex items-center">
      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        component="div"
      >
        <Stage width={1584} height={396} ref={stageRef}>
          {!chosenId && (
            <Layer>
              <Rect x={0} y={0} width={1584} height={396} fill="#f0f0f0" />
              <Label x={10} y={10} opacity={0.9}>
                <Tag fill="#404040" />
                <Text
                  text="Please click on 'Choose Template' > Select a template to start editing"
                  fontFamily="Calibri"
                  fontSize={24}
                  padding={8}
                  fill="white"
                  fontStyle="bold"
                />
              </Label>
            </Layer>
          )}

          {chosenId && (
            <TemplateLayer templateId={chosenId} setSlots={setSlots} />
          )}
        </Stage>
      </Box>
    </div>
  );
}

function TemplateLayer({
  templateId,
  setSlots,
}: {
  templateId: string;
  setSlots: (slots: Slot[]) => void;
}) {
  const {
    data: template,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = useTemplate(templateId);
  const { isPreviewActive } = usePreview();

  const [image] = useImage(template?.path ?? "");

  useEffect(() => {
    if (!template || isTemplateLoading || isTemplateError) {
      return;
    }

    setSlots(template.slots);
  }, [template, isTemplateLoading, isTemplateError, setSlots]);

  if (isTemplateLoading || isTemplateError || !template) {
    return null;
  }

  return (
    <Layer>
      <Image alt="a" x={0} y={0} width={1584} height={396} image={image} />

      {template.slots.map((slot, index) => (
        <EmptySlot key={index} slot={slot} isPreviewing={isPreviewActive} />
      ))}
    </Layer>
  );
}

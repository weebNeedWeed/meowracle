"use client";

import React, { useCallback, useRef, useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";
import EmptySlot from "./empty-slot";
import { Slot } from "@/app/lib/definitions";
import Konva from "konva";
import { useDragAndDrop } from "@/app/contexts/drag-and-drop";

const slotData: Slot[] = [
  {
    index: 1,
    x: 1417,
    y: 43,
    width: 105,
    height: 124,
  },
];

export default function TemplateEditor() {
  const [hello] = useImage("/example-template.png");
  const stageRef = useRef<Konva.Stage>(null);

  const { dragItem, isDragging, clearDragItem } = useDragAndDrop();
  const [slots, setSlots] = useState<Slot[]>(slotData);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
  };

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

  return (
    <div className="overflow-x-scroll w-full h-full justify-start flex items-center">
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <Stage width={1584} height={396} ref={stageRef}>
          <Layer>
            <Rect x={0} y={0} width={1584} height={396} fill="#f0f0f0" />
          </Layer>

          <Layer>
            <Image
              alt="a"
              x={0}
              y={0}
              width={1584}
              height={396}
              image={hello}
            />

            {slots.map((slot, index) => (
              <EmptySlot key={index} slot={slot} />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

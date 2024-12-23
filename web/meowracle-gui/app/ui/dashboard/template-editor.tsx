"use client";

import React, { useRef, useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";
import EmptySlot from "./empty-slot";
import { Slot } from "@/app/lib/definitions";
import Konva from "konva";
import { useDragAndDrop } from "@/app/contexts/drag-and-drop";

const slots: Slot[] = [
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

  const { dragItem } = useDragAndDrop();

  const [image, setImage] = useState<{
    x: number;
    y: number;
    imageUrl: string;
  } | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.dir(1);
    if (!stageRef.current) {
      return;
    }

    stageRef.current.setPointersPositions(e);
    setImage({
      ...stageRef.current.getPointerPosition()!,
      imageUrl: dragItem!,
    });
    console.log(stageRef.current.getPointerPosition());
  };

  return (
    <div
      className="overflow-x-scroll w-full h-full justify-start flex items-center"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Stage width={1584} height={396} ref={stageRef}>
        <Layer>
          <Rect x={0} y={0} width={1584} height={396} fill="#f0f0f0" />
        </Layer>

        <Layer>
          <Image alt="a" x={0} y={0} width={1584} height={396} image={hello} />

          {slots.map((slot, index) => (
            <EmptySlot key={index} slot={slot} />
          ))}

          {image && <MyImage {...image} />}
        </Layer>
      </Stage>
    </div>
  );
}

function MyImage({
  x,
  y,
  imageUrl,
}: {
  x: number;
  y: number;
  imageUrl: string;
}) {
  const [img] = useImage(imageUrl);
  return (
    img && (
      <Image
        x={x}
        y={y}
        offsetX={img!.width / 2}
        offsetY={img!.height / 2}
        width={img!.width}
        height={img!.height}
        image={img}
        alt="a"
      />
    )
  );
}

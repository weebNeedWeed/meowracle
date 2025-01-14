"use client";

import { useElementSize } from "@mantine/hooks";
import { Stage } from "konva/lib/Stage";
import { useEffect, useRef } from "react";
import { Layer, Rect, Stage as StageComp } from "react-konva";

export default function Editor() {
  const { ref: divRef, width: divWidth, height: divHeight } = useElementSize();
  const stageRef = useRef<Stage | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.width(divWidth);
      stage.height(divHeight);
      stage.batchDraw();
      console.log(stage.width(), stage.height());
    }
  }, [divWidth, divHeight]);

  return (
    <div
      ref={divRef}
      className="grow h-full bg-transparent shrink overflow-hidden"
    >
      <StageComp draggable ref={stageRef} width={divWidth} height={divHeight}>
        <Layer>
          <Rect
            x={20}
            y={20}
            width={100}
            height={50}
            fill="green"
            stroke="black"
            strokeWidth={4}
          />
          <Rect
            x={150}
            y={40}
            width={100}
            height={50}
            fill="red"
            shadowBlur={10}
            cornerRadius={10}
          />
          <Rect
            x={50}
            y={120}
            width={100}
            height={100}
            fill="blue"
            cornerRadius={[0, 10, 20, 30]}
          />
        </Layer>
      </StageComp>
    </div>
  );
}

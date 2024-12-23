import { Slot } from "@/app/lib/definitions";
import { RegularPolygon, Text } from "react-konva";

export default function EmptySlot({ slot }: { slot: Slot }) {
  return (
    <>
      <RegularPolygon
        x={slot.x + slot.width / 2}
        y={slot.y + slot.height / 2}
        sides={6}
        radius={slot.height / 2}
        fill="#141414"
        opacity={0.4}
      />
      <RegularPolygon
        x={slot.x + slot.width / 2}
        y={slot.y + slot.height / 2}
        sides={6}
        radius={slot.height / 2}
        stroke="#141414"
        strokeWidth={4}
      />
      <Text
        width={slot.width}
        height={slot.height}
        x={slot.x}
        y={slot.y}
        verticalAlign="middle"
        align="center"
        text={slot.index.toString()}
        fill="#141414"
        fontSize={35}
      />
    </>
  );
}

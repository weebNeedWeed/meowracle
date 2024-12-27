import { Slot } from "@/app/lib/definitions";
import { getCrop } from "@/app/lib/utils";
import { useState } from "react";
import { RegularPolygon, Text, Image, Circle, Group } from "react-konva";
import useImage from "use-image";

export default function EmptySlot({
  slot,
  isPreviewing,
  onRemoveBadge,
}: {
  slot: Slot;
  isPreviewing: boolean;
  onRemoveBadge: () => void;
}) {
  const [fillImage] = useImage(slot.fillImage ?? "");
  const [deleteIcon] = useImage("/delete-icon.svg");
  const [hovered, setHovered] = useState(false);

  if (!slot.fillImage && !isPreviewing) {
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
          radius={slot.height / 2 - 3} // strokewidth is 2
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
          text={"+"}
          fill="#141414"
          fontSize={40}
        />
      </>
    );
  }

  if (!fillImage?.width || !fillImage?.height) {
    return null;
  }
  const { cropX, cropY, cropWidth, cropHeight } = getCrop(
    { width: fillImage.width, height: fillImage.height },
    { width: slot.width, height: slot.height },
    "center-middle"
  );
  return (
    <Group
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <Image
        onMouseOver={() => {
          console.log("hovered");
        }}
        alt="Meowracle Selected Badge"
        x={slot.x}
        y={slot.y}
        width={slot.width}
        height={slot.height}
        image={fillImage}
        crop={{
          x: cropX,
          y: cropY,
          width: cropWidth,
          height: cropHeight,
        }}
      />
      {hovered && !isPreviewing && (
        <Group
          onMouseOver={(e) => {
            const stage = e.target.getStage();
            if (stage) stage.container().style.cursor = "pointer";
          }}
          onMouseOut={(e) => {
            const stage = e.target.getStage();
            if (stage) stage.container().style.cursor = "default";
          }}
          onClick={(e) => {
            const stage = e.target.getStage();
            if (stage) stage.container().style.cursor = "default";
            onRemoveBadge();
          }}
        >
          <Circle
            x={slot.x + slot.width - 10}
            y={slot.y + 10}
            radius={12}
            fill="red"
            opacity={0.5}
          />
          <Image
            x={slot.x + slot.width - 17}
            y={slot.y + 2}
            width={15}
            height={15}
            image={deleteIcon}
            alt="delete"
          />
        </Group>
      )}
    </Group>
  );
}

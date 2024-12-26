import { Slot } from "@/app/lib/definitions";
import { getCrop } from "@/app/lib/utils";
import { RegularPolygon, Text, Image } from "react-konva";
import useImage from "use-image";

export default function EmptySlot({
  slot,
  isPreviewing,
}: {
  slot: Slot;
  isPreviewing: boolean;
}) {
  const [fillImage] = useImage(slot.fillImage ?? "");
  console.log(isPreviewing);
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
          text={slot.index.toString()}
          fill="#141414"
          fontSize={35}
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
  );
}

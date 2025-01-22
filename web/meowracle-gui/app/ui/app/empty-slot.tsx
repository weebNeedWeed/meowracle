import { Slot } from "@/app/lib/api/templates";
import { getCrop } from "@/app/lib/utils";
import { Image as ImageShape } from "konva/lib/shapes/Image";
import { Transformer as TransformerShape } from "konva/lib/shapes/Transformer";
import { useEffect, useRef } from "react";
import { RegularPolygon, Text, Group, Image, Transformer } from "react-konva";
import useImage from "use-image";

export default function EmptySlot({
  slot,
  isSelected,
  onSelect,
  isLocked,
}: {
  slot: Slot;
  isSelected: boolean;
  onSelect: () => void;
  isLocked: boolean;
}) {
  if (!isLocked && !slot.fillImage) {
    return (
      <Group key={slot.index}>
        <RegularPolygon
          x={slot.x + slot.width / 2}
          y={slot.y + slot.height / 2}
          sides={6}
          radius={slot.height / 2}
          fill="#B1F0F7"
          opacity={0.4}
        />
        <RegularPolygon
          x={slot.x + slot.width / 2}
          y={slot.y + slot.height / 2}
          sides={6}
          radius={slot.height / 2 - 3}
          stroke="#81BFDA"
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
          fill="#81BFDA"
          fontSize={40}
        />
      </Group>
    );
  }

  return (
    <Group>
      <BadgeImage
        fillImage={slot.fillImage!}
        slot={slot}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    </Group>
  );
}

function BadgeImage({
  fillImage,
  slot,
  isSelected,
  onSelect,
}: {
  slot: Slot;
  fillImage: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [img] = useImage(fillImage, "anonymous");

  const imageRef = useRef<ImageShape>(null);
  const trRef = useRef<TransformerShape>(null);

  useEffect(() => {
    trRef.current?.nodes([imageRef.current!]);
    trRef.current?.getLayer()?.batchDraw();
  }, [isSelected]);

  if (!img) {
    return null;
  }

  const { cropX, cropY, cropWidth, cropHeight } = getCrop(
    { width: img.width, height: img.height },
    { width: slot.width, height: slot.height },
    "center-middle"
  );

  return (
    <>
      <Image
        onClick={onSelect}
        ref={imageRef}
        alt="Meowracle Selected Badge"
        x={slot.x}
        y={slot.y}
        width={slot.width}
        height={slot.height}
        image={img}
        crop={{
          x: cropX,
          y: cropY,
          width: cropWidth,
          height: cropHeight,
        }}
      />
      {isSelected && (
        <Transformer
          flipEnabled={false}
          rotateEnabled={false}
          resizeEnabled={false}
          ref={trRef}
          borderDash={[4, 3]}
          anchorCornerRadius={5}
          anchorStrokeWidth={15}
          borderStrokeWidth={2}
          padding={8}
          anchorFill="#81BFDA"
        />
      )}
    </>
  );
}

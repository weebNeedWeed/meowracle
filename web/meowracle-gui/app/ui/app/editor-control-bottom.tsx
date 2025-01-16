import { useEditorContext } from "@/app/contexts/editor";
import { ActionIcon, Button } from "@mantine/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useControls } from "react-zoom-pan-pinch";

export default function EditorControlBottom() {
  const {
    state: { isFullscreen },
    dispatch: editorDispatch,
  } = useEditorContext();

  const [displayingScale, setDisplayingScale] = useState(1);
  const { setTransform } = useControls();

  // when the displayingScale changes update the transform(scale)
  useEffect(() => {
    setTransform(0, 0, displayingScale);
  }, [displayingScale, setTransform]);

  const handleZoomout = () => {
    if (displayingScale <= 0.70000001) return;
    setDisplayingScale((prev) => prev - 0.25);
  };

  const handleZoomin = () => {
    if (displayingScale >= 2) return;
    setDisplayingScale((prev) => prev + 0.25);
  };

  const toggleFullscreen = () => {
    editorDispatch({ type: "TOGGLE_FULLSCREEN" });
  };

  return (
    <div className="absolute w-full h-10 bottom-4 left-0">
      <div className="flex gap-5 justify-center items-center h-full">
        <div className="flex items-center">
          <ActionIcon
            onClick={handleZoomout}
            size="md"
            classNames={{
              root: "border-[#5C5C66] hover:bg-[#2D2D38]/10 bg-transparent shrink-0 text-[#B7B7CD] rounded-md font-bold cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 uppercase flex border",
            }}
          >
            <FaMinus className="w-2.5 h-2.5 text-[#B7B7CD]" />
          </ActionIcon>

          <span className="text-[#B7B7CD] text-sm mx-4 w-8 text-center">
            {Math.round(displayingScale * 100)}%
          </span>

          <ActionIcon
            onClick={handleZoomin}
            size="md"
            classNames={{
              root: "border-[#5C5C66] hover:bg-[#2D2D38]/10 bg-transparent shrink-0 text-[#B7B7CD] rounded-md font-bold cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 uppercase flex border",
            }}
          >
            <FaPlus className="w-2.5 h-2.5 text-[#B7B7CD]" />
          </ActionIcon>
        </div>

        <Button
          onClick={toggleFullscreen}
          size="xs"
          classNames={{
            root: clsx(
              "bg-transparent uppercase text-xs font-normal shrink-0 rounded-md px-4 cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 flex border",
              {
                "border-[#5C5C66] hover:bg-[#2D2D38]/10 hover:text-[#B7B7CD] text-[#B7B7CD]":
                  !isFullscreen,
                "border-[#1BE4C9] hover:bg-[#1BE4C9]/10 hover:text-[#1BE4C9] text-[#1BE4C9]":
                  isFullscreen,
              }
            ),
          }}
        >
          {isFullscreen ? (
            <MdFullscreenExit className="h-4 w-4 mr-2" />
          ) : (
            <MdFullscreen className="h-4 w-4 mr-2" />
          )}
          Full Screen
        </Button>
      </div>
    </div>
  );
}

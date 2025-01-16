import { useEditorContext } from "@/app/contexts/editor";
import { Button } from "@mantine/core";
import { MdRedo, MdUndo } from "react-icons/md";

export default function EditorControlTop() {
  const {
    state: { isFullscreen },
  } = useEditorContext();

  // if isFullscreen is true, hide the control
  if (isFullscreen) {
    return null;
  }

  return (
    <div className="absolute w-full h-10 top-4 left-0">
      <div className="flex gap-5 justify-center items-center h-full">
        <div className="flex items-center gap-x-4">
          <Button
            size="xs"
            classNames={{
              root: "uppercase bg-transparent text-xs font-normal shrink-0 rounded-md px-4 cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 flex border border-[#5C5C66] hover:bg-[#2D2D38]/10 hover:text-[#B7B7CD] text-[#B7B7CD]",
            }}
          >
            <MdUndo className="h-4 w-4 mr-2" />
            Undo
          </Button>

          <Button
            size="xs"
            classNames={{
              root: "uppercase bg-transparent text-xs font-normal shrink-0 rounded-md px-4 cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 flex border border-[#5C5C66] hover:bg-[#2D2D38]/10 hover:text-[#B7B7CD] text-[#B7B7CD]",
            }}
          >
            <MdRedo className="h-4 w-4 mr-2" />
            Redo
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEditorContext } from "@/app/contexts/editor";
import MenuSection from "./menu-section";
import { LuLayoutTemplate } from "react-icons/lu";
import { Select } from "@mantine/core";
import clsx from "clsx";
import { MdDelete } from "react-icons/md";

export default function RightSideBar() {
  const {
    state: { changingProperties, isFullscreen },
    dispatch: editorDispatch,
  } = useEditorContext();

  if (!changingProperties || isFullscreen) return null;

  return (
    <>
      {changingProperties.elementType === "template" && (
        <MenuSection
          onClose={() => editorDispatch({ type: "CLEAR_CHANGING_PROPERTIES" })}
          closeOnLeftSide
        >
          <ChangeTemplateSettings />
        </MenuSection>
      )}

      {changingProperties.elementType === "slot" && (
        <MenuSection
          onClose={() => editorDispatch({ type: "CLEAR_CHANGING_PROPERTIES" })}
          closeOnLeftSide
        >
          <SlotSettings />
        </MenuSection>
      )}
    </>
  );
}

function ChangeTemplateSettings() {
  const {
    state: { editing },
    dispatch: editorDispatch,
  } = useEditorContext();

  const handleSetLock = (status: boolean) => {
    editorDispatch({ type: "SET_LOCK_STATUS", status });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-14 flex items-center justify-start px-4 gap-x-4">
        <LuLayoutTemplate className="w-5 h-5 text-[#6C6C7B]" />
        <h2 className="text-sm text-[#AEAEB1] font-medium">
          Template Settings
        </h2>
      </div>

      <hr className="h-[1px] w-full bg-[#373743] border-none" />

      <div className="p-4 flex gap-y-2 flex-col">
        <h3 className="text-[#8F8FA1] text-xs uppercase font-semibold">Lock</h3>
        <div className="flex gap-x-2">
          <button
            onClick={() => handleSetLock(true)}
            className={clsx(
              "h-8 flex justify-center items-center text-sm w-full rounded-md text-[#B7B7CD] bg-[#1B1B22] hover:bg-[#373743] hover:text-[#EAEAF6] transition-colors uppercase duration-100",
              { "bg-[#373743] text-[#EAEAF6]": editing?.locked }
            )}
          >
            On
          </button>
          <button
            onClick={() => handleSetLock(false)}
            className={clsx(
              "h-8 flex justify-center items-center text-sm w-full rounded-md text-[#B7B7CD] bg-[#1B1B22] hover:bg-[#373743] hover:text-[#EAEAF6] transition-colors uppercase duration-100",
              { "bg-[#373743] text-[#EAEAF6]": !editing?.locked }
            )}
          >
            off
          </button>
        </div>
      </div>

      <hr className="h-[1px] w-full bg-[#373743] border-none" />

      <div className="p-4 flex gap-y-2 flex-col">
        <h3 className="text-[#8F8FA1] text-xs uppercase font-semibold">
          number of slots
        </h3>
        <Select
          size="sm"
          placeholder="Choose number of slots"
          data={Array.from(
            Array(editing?.selectedTemplate.maxNumberOfSlots ?? 1)
          ).map((_, index) => ({
            label: index + 1 + "",
            value: index + 1 + "",
          }))}
          defaultValue={(editing?.slots ?? 1) + ""}
          color="input"
          allowDeselect={false}
          classNames={{
            input: "bg-transparent text-[#B7B7CD] border-[#5C5C66]",
            wrapper: "bg-transparent",
            options: "text-[#B7B7CD] bg-transparent",
            option: "hover:bg-[#2D2D38]",
            dropdown: "bg-[#27272F] border-[#5C5C66]",
            section: "*:text-[#B7B7CD]",
          }}
        />
      </div>
    </div>
  );
}

function SlotSettings() {
  const {
    state: { changingProperties },
    dispatch,
  } = useEditorContext();
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-14 flex items-center justify-start px-4 gap-x-4">
        <LuLayoutTemplate className="w-5 h-5 text-[#6C6C7B]" />
        <h2 className="text-sm text-[#AEAEB1] font-medium">Slot Settings</h2>
      </div>

      <hr className="h-[1px] w-full bg-[#373743] border-none" />

      <div className="p-4 flex gap-y-2 flex-col">
        <button
          onClick={() => {
            dispatch({
              type: "SET_DELETING_SLOT",
              slotIndex: changingProperties?.selectedElement,
            });
          }}
          className="h-8 flex justify-center items-center text-sm w-full gap-x-1.5 rounded-md text-red-500 bg-[#1B1B22] uppercase duration-100 border border-red-500"
        >
          <MdDelete className="w-5 h-5" />
          Delete
        </button>
      </div>
    </div>
  );
}

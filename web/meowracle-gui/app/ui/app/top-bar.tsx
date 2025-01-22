"use client";

import Link from "next/link";
import { RiDownloadLine } from "react-icons/ri";
import Image from "next/image";
import { useEditorContext } from "@/app/contexts/editor";
import { Checkbox, Loader, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function TopBar() {
  const {
    state: { isFullscreen, exporting },
    dispatch: editorDispatch,
  } = useEditorContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [exportFormat, setExportFormat] = useState<"jpeg" | "png">("jpeg");
  const [exportHD, setExportHD] = useState(true);

  const handleExport = () => {
    editorDispatch({
      type: "SET_IS_EXPORTING",
      isHd: exportHD,
      format: exportFormat,
    });
  };

  // if isFullscreen is true, hide the topbar
  if (isFullscreen) {
    return null;
  }

  return (
    <>
      <nav className="bg-[#16161D] h-20 w-full flex items-center shrink-0">
        <div className="flex items-center h-full shrink-0">
          <div className="w-28 justify-center flex items-center">
            <Link
              href="#"
              className="p-0.5 rounded-none bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] clip-path-diamond rotate-45"
            >
              <div className="bg-[#16161D] clip-path-diamond p-1">
                <Image
                  src="/logo.png"
                  alt="meowracle.live logo"
                  width={40}
                  height={40}
                  className="w-6 h-6 -rotate-45"
                />
              </div>
            </Link>
          </div>

          {/* <span className="flex items-center gap-x-3">
          <input
            type="text"
            defaultValue="hello orld"
            disabled
            className="bg-transparent border-none text-white text-base font-normal w-auto max-w-28 tracking-wider"
          />
          <ActionIcon
            size="md"
            className="border-[#5C5C66] hover:bg-[#2D2D38]/10 bg-transparent shrink-0 text-[#B7B7CD] rounded-md font-bold cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 uppercase flex border"
          >
            <FaPen className="text-[#8F8FA1] w-2 h-2" />
          </ActionIcon>
        </span> */}
        </div>

        <div className="flex items-center h-full grow justify-start gap-x-4">
          {/* <span className="uppercase text-xs text-[#5C5C66] font-bold">
          Export Formats
        </span>
        <Select
          size="xs"
          placeholder="Pick a format"
          data={[
            {
              label: "LinkedIn 1584x396",
              value: "linkedin",
            },
          ]}
          defaultValue="linkedin"
          color="input"
          allowDeselect={false}
          classNames={{
            input: "bg-transparent text-[#B7B7CD] border-[#5C5C66]",
            wrapper: "bg-transparent",
            options: "text-[#B7B7CD] bg-transparent",
            option: "hover:bg-[#2D2D38]",
            dropdown: "bg-transparent border-[#5C5C66]",
          }}
        /> */}

          <Link
            href="/#subscribe"
            target="_blank"
            className="uppercase text-white shrink-0 flex items-center gap-x-2 text-sm ml-2 border-b border-white/30 pb-0.5 hover:border-white/60 transition-colors"
          >
            subscribe for Updates
          </Link>
        </div>

        <div className="mr-9 flex items-stretch gap-x-4">
          <button
            onClick={open}
            className="bg-[#1BE4C9] shrink-0 text-[#16161D] rounded-md hover:bg-[#17B89D] px-5 py-1 font-medium cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 uppercase text-xs flex items-center gap-x-2"
          >
            <RiDownloadLine className="h-5 w-5" /> Export
          </button>
        </div>
      </nav>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={close}
        title="Export your design"
        classNames={{
          body: "bg-[#16161D] text-white",
          header: "bg-[#16161D] text-white",
          title: "text-[#AEAEB1] uppercase font-medium",
          root: "bg-[#16161D] text-white",
          content: "bg-[#16161D] text-white",
          close: "text-[#B7B7CD] hover:bg-[#2D2D38]",
        }}
      >
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-xs text-[#8F8FA1] uppercase font-semibold">
            export format
          </p>
          <Select
            size="sm"
            placeholder="Choose number of slots"
            data={[
              {
                label: "JPEG",
                value: "jpeg",
              },
              {
                label: "PNG",
                value: "png",
              },
            ]}
            defaultValue={exportFormat}
            onChange={(e) => setExportFormat(e as "jpeg" | "png")}
            color="input"
            allowDeselect={false}
            classNames={{
              input: "bg-transparent text-[#B7B7CD] border-[#5C5C66]",
              wrapper: "bg-transparent",
              options: "text-[#B7B7CD] bg-transparent",
              option: "hover:bg-[#2D2D38]",
              dropdown: "bg-[#16161D] border-[#5C5C66]",
              section: "*:text-[#B7B7CD]",
            }}
          />
        </div>

        <Checkbox
          size="xs"
          defaultChecked
          onChange={(e) => setExportHD(e.currentTarget.checked)}
          label="Export in HD resolution"
          color="#1BE4C9"
          classNames={{
            label: "text-[#8F8FA1] uppercase font-semibold",
          }}
        />

        <button
          onClick={handleExport}
          disabled={exporting !== undefined}
          className="bg-[#1BE4C9] w-full mt-6 text-[#16161D] rounded-md hover:bg-[#17B89D] px-5 py-2 font-semibold cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 uppercase text-xs flex items-center justify-center gap-x-2"
        >
          {exporting ? (
            <Loader color="#16161D" size="sm" />
          ) : (
            <>
              <RiDownloadLine className="h-5 w-5" /> Export
            </>
          )}
        </button>
      </Modal>
    </>
  );
}

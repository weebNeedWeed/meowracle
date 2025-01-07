import { Select } from "@mantine/core";
import Link from "next/link";
import { FaPen } from "react-icons/fa6";
import { RiDownloadLine } from "react-icons/ri";
import Image from "next/image";

export default function TopBar() {
  return (
    <nav className="bg-[#16161D] h-20 w-full flex items-center shrink-0">
      <div className="flex items-center h-full shrink-0">
        <div className="w-28 justify-center flex items-center">
          <Link
            href="#"
            className="p-0.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
          >
            <div className="bg-[#16161D] rounded-full p-1">
              <Image
                src="/logo.png"
                alt="meowracle.live logo"
                width={40}
                height={40}
                className="w-6 h-6"
              />
            </div>
          </Link>
        </div>

        <span className="flex items-center gap-x-3">
          <input
            type="text"
            defaultValue="hello orld"
            disabled
            className="bg-transparent border-none text-white text-base font-normal w-auto max-w-28 tracking-wider"
          />
          <button className="border border-[#8F8FA1] p-1.5 rounded hover:bg-[#8F8FA1]/10 active:translate-y-0.5 transition-all duration-200">
            <FaPen className="text-[#8F8FA1] w-2.5 h-2.5" />
          </button>
        </span>
      </div>

      <div className="flex items-center h-full grow justify-center gap-x-4 ">
        <span className="uppercase text-xs text-[#5C5C66] font-bold">
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
        />
      </div>

      <div className="mr-9">
        <button className="bg-[#1BE4C9] shrink-0 text-[#1B1B22] rounded-md hover:bg-[#17B89D] px-5 py-2 font-bold cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 uppercase text-xs flex items-center gap-x-2">
          <RiDownloadLine className="h-4 w-4" /> Export
        </button>
      </div>
    </nav>
  );
}

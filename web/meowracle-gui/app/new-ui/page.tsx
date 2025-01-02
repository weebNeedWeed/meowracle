import clsx from "clsx";
import { openSans, lato, montserrat, poppins } from "../ui/fonts";
import Image from "next/image";
import Link from "next/link";
import { FaDownload, FaPen } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { RiDownloadLine } from "react-icons/ri";
import { Input, Select } from "@mantine/core";
import { LuLayoutTemplate } from "react-icons/lu";
import { TbHexagonPlus2 } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

export default function Page() {
  return (
    <div className={clsx(poppins.className, "antialiased")}>
      <div className="flex flex-col h-screen w-screen">
        {/* topbar */}
        <nav className="bg-[#16161D] h-20 w-full flex items-center shrink-0">
          <div className="flex items-center h-full gap-x-12 shrink-0">
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

        <main className="flex flex-row grow bg-[#1B1B22] overflow-hidden">
          <nav className="h-full bg-[#27272F] w-28 flex flex-col overflow-auto shrink-0">
            <button className="h-20 shrink-0 flex flex-col justify-center items-center text-[#8F8FA1] gap-y-0.5 uppercase text-xs font-semibold hover:bg-[#737382] hover:text-[#EAEAF6] transition-all duration-100 ease-in-out">
              <LuLayoutTemplate className="w-6 h-6" />
              Templates
            </button>
            <button className="h-20 shrink-0 flex flex-col justify-center items-center text-[#8F8FA1] gap-y-0.5 uppercase text-xs font-semibold hover:bg-[#737382] hover:text-[#EAEAF6] transition-all duration-100 ease-in-out">
              <TbHexagonPlus2 className="w-6 h-6" />
              Badges
            </button>
          </nav>

          <div className="bg-[#27272F] w-80 h-full relative shrink-0">
            <div className="flex flex-col overflow-hidden h-full">
              <div className="px-4 pt-4 pb-4">
                <Input
                  type="text"
                  placeholder="Find template..."
                  leftSection={<IoSearchSharp />}
                  rightSection={<IoMdClose />}
                  classNames={{
                    input:
                      "bg-transparent text-[#B7B7CD] border-[#5C5C66] hover:border-[#5C5C66] focus:border-[#5C5C66]",
                    wrapper: "bg-transparent",
                  }}
                />
              </div>

              <div className="grow bg-transparent w-full overflow-y-scroll px-4">
                <div className="relative shadow-md">
                  <button className="absolute top-1 right-1 text-xs bg-[#1B1B22]/50 text-white p-1 rounded-md hover:bg-[#1B1B22]/80 transition-colors duration-100">
                    <BsThreeDots />
                  </button>

                  <Image
                    src={"/templates/example-template.png"}
                    alt={"Example template preview"}
                    width={1584}
                    height={396}
                    className="w-full h-auto cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button className="absolute top-5 -right-10 bg-[#27272F] hover:bg-[#323239] text-[#8F8FA1] p-2 rounded-full transition-all duration-100 ease-in-out">
              <IoMdClose />
            </button>
          </div>

          <div className="grow w-full h-full bg-red-800"></div>

          <div className="bg-[#27272F] w-80 h-full shrink-0"></div>
        </main>
      </div>
    </div>
  );
}

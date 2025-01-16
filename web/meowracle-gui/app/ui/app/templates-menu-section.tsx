import { Input, Button } from "@mantine/core";
import clsx from "clsx";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {
  IoSearchSharp,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import MenuSection from "./menu-section";
import Image from "next/image";
import Link from "next/link";

export default function TemplatesMenuSection({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <MenuSection onClose={onClose}>
      <div className="flex flex-col overflow-hidden h-full gap-y-3">
        <div className="px-4 pt-4">
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

        <div className="grow flex flex-col bg-transparent w-full overflow-y-scroll pl-4 scrollbar">
          <div className="max-w-full w-full overflow-hidden shrink-0 h-10 mb-5">
            <div className="overflow-x-scroll h-auto w-full flex justify-between items-center gap-x-2 no-scrollbar relative">
              <button className="sticky flex justify-center items-center text-white p-2 rounded-full transition-colors duration-200 left-0 bg-[#27272F]/80 hover:bg-[#27272F] z-10">
                <IoChevronBackOutline />
              </button>

              <Button
                variant="outline"
                classNames={{
                  root: clsx(
                    "font-light transition-all duration-200 w-auto shrink-0",
                    {
                      "bg-[#2D2D38] border-[#1BE4C9] text-[#1BE4C9] hover:bg-[#353542] hover:border-[#1BE4C9] hover:text-[#1BE4C9]":
                        true,
                    },
                    {
                      "text-[#B7B7CD] border-[#5C5C66] hover:border-[#5C5C66] hover:text-[#B7B7CD] hover:bg-[#2D2D38] ":
                        false,
                    }
                  ),
                }}
              >
                {"category.name"}

                {true && (
                  <span className="ml-2 hover:scale-110 transition-transform">
                    <IoMdClose className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <button className="sticky flex justify-center items-center text-white p-2 rounded-full transition-colors duration-200 right-0 bg-[#27272F]/80 hover:bg-[#27272F] z-10">
                <IoChevronForwardOutline />
              </button>
            </div>
          </div>

          <div className="text-[#8F8FA1] text-sm mb-4">0 results found</div>

          <TemplateCard />
        </div>
      </div>
    </MenuSection>
  );
}

function TemplateCard() {
  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      <div className="bg-[#2D2D38] p-3 rounded-xl hover:bg-[#353542] transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[#B7B7CD] text-sm">Example Template</h4>
          <button className="text-[#8F8FA1] hover:text-[#EAEAF6] p-1.5 rounded-lg transition-colors duration-200">
            <BsThreeDots className="w-3 h-3" />
          </button>
        </div>
        <div className="relative w-full aspect-[4/1] mb-2">
          <Link href="#">
            <Image
              src={"/templates/example-template.png"}
              alt={"Example template preview"}
              fill
              className="rounded-lg object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-[#8F8FA1]">Slots</span>
          <span className="text-[#1BE4C9]">4</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-1 text-xs rounded-md bg-[#1B1B22] text-[#B7B7CD]">
            Default
          </span>
          <span className="px-2 py-1 text-xs rounded-md bg-[#1B1B22] text-[#B7B7CD]">
            Basic
          </span>
        </div>
      </div>
    </div>
  );
}

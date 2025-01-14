"use client";

import { Input, Button } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { TbHexagonPlus2 } from "react-icons/tb";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import clsx from "clsx";
import MenuSection from "./menu-section";
import BadgesMenuSection from "./badges-menu-section";

const tabs = [
  {
    name: "Templates",
    icon: LuLayoutTemplate,
    Component: TemplatesMenuSection,
  },
  {
    name: "Badges",
    icon: TbHexagonPlus2,
    Component: BadgesMenuSection,
  },
];

export default function LeftSideBar() {
  const [active, setActive] = useState(-1);

  const handleTabChange = useCallback(
    (index: number) => {
      // if the tab is already active, close it
      if (active === index) {
        setActive(-1);
        return;
      }
      // otherwise, set the tab as active
      setActive(index);
    },
    [active]
  );

  return (
    <>
      <nav className="h-full bg-[#27272F] w-28 flex flex-col overflow-auto shrink-0">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={clsx(
              "h-20 shrink-0 flex flex-col justify-center items-center text-[#8F8FA1] gap-y-0.5 uppercase text-xs font-semibold hover:text-[#EAEAF6] transition-all duration-100 ease-in-out",
              { "bg-[#737382] text-[#EAEAF6]": active === index }
            )}
          >
            <tab.icon className="w-6 h-6" />
            {tab.name}
          </button>
        ))}
      </nav>

      {tabs.map(
        (tab, index) =>
          index === active && (
            <tab.Component key={tab.name} onClose={() => setActive(-1)} />
          )
      )}
    </>
  );
}

function TemplatesMenuSection({ onClose }: { onClose: () => void }) {
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

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#2D2D38] p-3 rounded-xl hover:bg-[#353542] transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[#EAEAF6] text-sm">Example Template</h4>
                <button className="text-[#8F8FA1] hover:text-[#EAEAF6] p-1.5 rounded-lg transition-colors duration-200">
                  <BsThreeDots className="w-3 h-3" />
                </button>
              </div>
              <div className="relative w-full aspect-[4/1] mb-2">
                <Image
                  src={"/templates/example-template.png"}
                  alt={"Example template preview"}
                  fill
                  className="rounded-lg object-cover hover:opacity-90 transition-opacity"
                />
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
        </div>
      </div>
    </MenuSection>
  );
}

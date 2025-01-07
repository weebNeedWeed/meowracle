"use client";

import { Carousel } from "@mantine/carousel";
import { Input, Button } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { TbHexagonPlus2 } from "react-icons/tb";
import Image from "next/image";
import { useCallback, useState } from "react";
import clsx from "clsx";

const tabs = [
  {
    name: "Templates",
    icon: LuLayoutTemplate,
  },
  {
    name: "Badges",
    icon: TbHexagonPlus2,
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

      {active !== -1 && <ChildMenu />}
    </>
  );
}

function ChildMenu() {
  return (
    <div className="bg-[#27272F] w-80 h-full relative shrink-0">
      <div className="flex flex-col overflow-hidden h-full gap-y-4">
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
            <Carousel
              slideSize="60%"
              height="40"
              slideGap="xs"
              controlsOffset="xs"
              align="start"
              classNames={{
                control:
                  "data-[inactive=true]:opacity-0 data-[inactive=true]:cursor-default",
              }}
            >
              <Carousel.Slide>
                <div className="flex gap-x-2">
                  <Button
                    variant="outline"
                    classNames={{
                      root: "text-[#B7B7CD] border-[#5C5C66] hover:border-[#5C5C66] hover:text-[#B7B7CD] hover:bg-[#2D2D38]",
                    }}
                  >
                    hello1
                  </Button>
                </div>
              </Carousel.Slide>
            </Carousel>
          </div>

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
  );
}

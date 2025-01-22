"use client";

import TemplatesMenuSection from "./templates-menu-section";
import { LuLayoutTemplate } from "react-icons/lu";
import { TbHexagonPlus2 } from "react-icons/tb";
import React, { useCallback, useState } from "react";
import clsx from "clsx";
import BadgesMenuSection from "./badges-menu-section";
import { useEditorContext } from "@/app/contexts/editor";

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
  // {
  //   name: "Help",
  //   icon: MdOutlineHelpOutline,
  //   Component: () => (
  //     <MenuSection onClose={() => {}}>
  //       <span></span>
  //     </MenuSection>
  //   ),
  // },
];

export default function LeftSideBar() {
  const [active, setActive] = useState(-1);
  const {
    state: { isFullscreen },
  } = useEditorContext();

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

  // if isFullscreen is true, hide the left sidebar
  if (isFullscreen) {
    return null;
  }

  return (
    <>
      <nav className="h-full bg-[#27272F] w-28 flex flex-col shrink-0">
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

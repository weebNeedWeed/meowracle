"use client";

import clsx from "clsx";
import "@mantine/carousel/styles.css";
import TopBar from "../ui/app/top-bar";
import LeftSideBar from "../ui/app/left-side-bar";
import { poppins } from "../ui/fonts";

export default function Page() {
  return (
    <div className={clsx(poppins.className, "antialiased")}>
      <div className="flex flex-col h-screen w-screen">
        <TopBar />

        <main className="flex flex-row grow bg-[#1B1B22] overflow-hidden">
          <LeftSideBar />

          <div className="grow w-full h-full"></div>

          <div className="bg-[#27272F] w-80 h-full shrink-0"></div>
        </main>
      </div>
    </div>
  );
}

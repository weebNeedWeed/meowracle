import clsx from "clsx";
import TopBar from "../ui/app/top-bar";
import LeftSideBar from "../ui/app/left-side-bar";
import { poppins } from "../ui/fonts";
import { Metadata } from "next";
import Editor from "../ui/app/editor";
import { EditorContextProvider } from "../contexts/editor";

export const metadata: Metadata = {
  title: "Editor",
};

export default function Page() {
  return (
    <div className={clsx(poppins.className, "antialiased")}>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <EditorContextProvider>
          <TopBar />

          <main className="flex flex-row grow bg-[#1B1B22] h-full overflow-hidden">
            <LeftSideBar />

            <Editor />

            {/* <div className="bg-[#27272F] w-80 h-full shrink-0"></div> */}
          </main>
        </EditorContextProvider>
      </div>
    </div>
  );
}

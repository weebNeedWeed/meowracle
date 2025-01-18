import {
  Input,
  Button,
  CloseButton,
  ActionIcon,
  Select,
  Loader,
} from "@mantine/core";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import {
  IoSearchSharp,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import MenuSection from "./menu-section";
import Image from "next/image";
import Link from "next/link";
import { useTemplateCategories } from "@/app/lib/api/template-categories";
import { useRef, useState } from "react";
import { TbAdjustments } from "react-icons/tb";
import { motion } from "motion/react";
import { Template, useTemplates } from "@/app/lib/api/templates";
import { useDebouncedValue } from "@mantine/hooks";
import { useEditorContext } from "@/app/contexts/editor";

export default function TemplatesMenuSection({
  onClose,
}: {
  onClose: () => void;
}) {
  const { data: getTempCats } = useTemplateCategories();
  const [activeTempCat, setActiveTempCat] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [maxNumberOfSlots, setMaxNumberOfSlots] = useState<string | null>(null);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebouncedValue(keyword, 500);

  const tempCatRef = useRef<HTMLDivElement>(null);
  const [catScrollLeft, setCatScrollLeft] = useState(0);

  const { data: getTemps, isLoading: isGetTempsLoading } = useTemplates({
    limit: 20,
    keyword: debouncedKeyword === "" ? undefined : debouncedKeyword,
    categoryId: activeTempCat === "" ? undefined : activeTempCat,
    slots: !maxNumberOfSlots ? undefined : parseInt(maxNumberOfSlots),
  });

  return (
    <MenuSection onClose={onClose}>
      <div className="flex flex-col overflow-hidden h-full gap-y-3">
        <div className="px-4 pt-4 gap-x-2 flex w-full relative">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.currentTarget.value)}
            placeholder="Find template..."
            leftSection={<IoSearchSharp />}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setKeyword("")}
                className="bg-transparent text-[#B7B7CD] hover:bg-transparent"
                style={{ display: keyword ? undefined : "none" }}
              />
            }
            classNames={{
              input:
                "bg-transparent text-[#B7B7CD] border-[#5C5C66] hover:border-[#5C5C66] focus:border-[#5C5C66]",
              wrapper: "bg-transparent grow",
            }}
          />

          <ActionIcon
            size="input-sm"
            onClick={() => setOpenFilter(!openFilter)}
            className={clsx(
              "bg-transparent shrink-0 rounded-xs font-bold cursor-pointer transition-colors duration-300 ease-in-out active:translate-y-0.5 uppercase flex border",
              {
                "border-[#1BE4C9] text-[#1BE4C9] hover:text-[#22FFE0] hover:bg-[#1BE4C9]/10":
                  openFilter,
                "border-[#5C5C66] text-[#B7B7CD] hover:text-[#FFFFFF] hover:bg-[#2D2D38]/10":
                  !openFilter,
              }
            )}
          >
            <TbAdjustments
              className={openFilter ? "w-4 h-4" : "text-[#8F8FA1] w-4 h-4"}
            />
          </ActionIcon>

          {openFilter && (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="absolute top-full left-0 z-50 w-full flex flex-col gap-y-4 p-4 pt-2.5"
            >
              <div className="bg-[#27272F] border border-[#1BE4C9] rounded-md p-4">
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-[#B7B7CD] text-sm font-normal">
                    Maximum number of slots
                  </h3>
                  <Select
                    size="sm"
                    placeholder="Choose number of slots"
                    data={Array.from(Array(12)).map((_, index) => ({
                      label: index + 1 + "",
                      value: index + 1 + "",
                    }))}
                    defaultValue={maxNumberOfSlots}
                    onChange={setMaxNumberOfSlots}
                    color="input"
                    allowDeselect={false}
                    clearable
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
                {/* <div className="flex flex-col gap-y-2">
                  <h3 className="text-[#B7B7CD] text-sm font-medium">
                    Filter by
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 text-sm rounded-md bg-[#1B1B22] text-[#B7B7CD] hover:bg-[#353542] transition-colors">
                      Default
                    </button>
                    <button className="px-3 py-1.5 text-sm rounded-md bg-[#1B1B22] text-[#B7B7CD] hover:bg-[#353542] transition-colors">
                      Custom
                    </button>
                  </div>
                </div> */}
              </div>
            </motion.div>
          )}
        </div>

        <div className="grow flex flex-col bg-transparent w-full overflow-y-scroll pl-4 scrollbar">
          <div className="max-w-full w-full overflow-hidden shrink-0 h-10 mb-5">
            <div className="relative h-9 flex w-full">
              <button
                onClick={() => {
                  tempCatRef.current?.scrollBy({
                    left: -100,
                    behavior: "smooth",
                  });
                }}
                className={clsx(
                  "sticky justify-center items-center text-white py-3 transition-colors duration-200 right-0 bg-[#27272F] z-10 flex",
                  {
                    hidden: catScrollLeft === 0,
                  }
                )}
              >
                <IoChevronBackOutline />
              </button>

              <div
                ref={tempCatRef}
                onScroll={(e) => setCatScrollLeft(e.currentTarget.scrollLeft)}
                className="grow flex w-full gap-x-2 absolute top-0 left-0 h-full items-center overflow-x-scroll no-scrollbar"
              >
                {getTempCats?.data.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    classNames={{
                      root: clsx(
                        "font-light transition-all duration-200 w-auto shrink-0",
                        {
                          "bg-[#2D2D38] border-[#1BE4C9] text-[#1BE4C9] hover:bg-[#353542] hover:border-[#1BE4C9] hover:text-[#1BE4C9]":
                            category.id === activeTempCat,
                        },
                        {
                          "text-[#B7B7CD] border-[#5C5C66] hover:border-[#5C5C66] hover:text-[#B7B7CD] hover:bg-[#2D2D38] ":
                            category.id !== activeTempCat,
                        }
                      ),
                    }}
                    onClick={() => {
                      if (category.id === activeTempCat) {
                        setActiveTempCat("");
                        return;
                      }
                      setActiveTempCat(category.id);
                    }}
                  >
                    {category.name}

                    {category.id === activeTempCat && (
                      <span className="ml-2 hover:scale-110 transition-transform">
                        <IoMdClose className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              <button
                onClick={() => {
                  tempCatRef.current?.scrollBy({
                    left: 100,
                    behavior: "smooth",
                  });
                }}
                className={clsx(
                  "ml-auto sticky justify-center items-center text-white py-3 transition-colors duration-200 right-0 bg-[#27272F] z-10 flex",
                  {
                    hidden:
                      tempCatRef.current &&
                      tempCatRef.current.scrollWidth - catScrollLeft ===
                        tempCatRef.current.clientWidth,
                  }
                )}
              >
                <IoChevronForwardOutline />
              </button>
            </div>
          </div>

          {getTemps ? (
            <div className="text-[#8F8FA1] text-sm mb-4">
              {getTemps.pageInfo!.totalRows}{" "}
              {getTemps.pageInfo!.totalRows === 1 ? "result" : "results"} found
            </div>
          ) : (
            <div className="text-[#8F8FA1] text-sm mb-4">0 results found</div>
          )}

          {isGetTempsLoading && (
            <div className="flex justify-center items-center">
              <Loader color="#B7B7CD" />;
            </div>
          )}

          {getTemps?.data.map((temp, index) => (
            <TemplateCard key={index} template={temp} />
          ))}
        </div>
      </div>
    </MenuSection>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const { dispatch: editorDispatch } = useEditorContext();

  const handleChooseTemplate = () => {
    editorDispatch({
      type: "SELECT_TEMPLATE",
      slots: 1,
      templateId: template.id,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      <div className="bg-[#2D2D38] p-3 rounded-xl hover:bg-[#353542] transition-all duration-200">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-[#B7B7CD] text-sm">{template.name}</h4>
          {/* <button className="text-[#8F8FA1] hover:text-[#EAEAF6] p-1.5 rounded-lg transition-colors duration-200">
            <BsThreeDots className="w-3 h-3" />
          </button> */}
        </div>
        <div className="relative w-full aspect-[4/1] mb-2">
          <Link href="#" className="block">
            <Image
              onClick={handleChooseTemplate}
              src={template.previewPath}
              alt={"Example template preview"}
              fill
              className="rounded-lg object-cover hover:opacity-90 active:scale-95 transition-all duration-200"
            />
          </Link>
        </div>
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-[#8F8FA1]">Slots</span>
          <span className="text-[#1BE4C9]">{template.maxNumberOfSlots}</span>
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

"use client";

import { Carousel } from "@mantine/carousel";
import { Input, Button, CloseButton, Loader } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { TbHexagonPlus2 } from "react-icons/tb";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import classes from "./left-side-bar.module.css";
import { Badge, useBadges } from "@/app/lib/api/badges";
import { useDebouncedValue } from "@mantine/hooks";
import { useBadgeCategories } from "@/app/lib/api/badge-categories";

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

function MenuSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0.5, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.2 }}
      className="bg-[#27272F] w-80 h-full relative shrink-0"
    >
      {children}
    </motion.section>
  );
}

function TemplatesMenuSection({ onClose }: { onClose: () => void }) {
  return (
    <MenuSection>
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

      <button
        onClick={onClose}
        className="absolute top-5 -right-10 bg-[#27272F] hover:bg-[#323239] text-[#8F8FA1] p-2 rounded-full transition-all duration-100 ease-in-out"
      >
        <IoMdClose />
      </button>
    </MenuSection>
  );
}

function BadgesMenuSection({ onClose }: { onClose: () => void }) {
  const bucketUrl =
    "https://meowracle-bucket-b4922fdf-57d1-4ef8-9971-953640730c71.s3.ap-southeast-1.amazonaws.com/";
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebouncedValue(keyword, 500);
  const [cursor, setCursor] = useState<any>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const { data: getBadgesCat } = useBadgeCategories();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [debouncedActiveCategory] = useDebouncedValue(activeCategory, 500);
  const { data: getBadges, isLoading: isGetBadgesLoading } = useBadges({
    limit: 40,
    keyword: debouncedKeyword,
    cursor,
    categoryId: debouncedActiveCategory ?? undefined,
  });

  const chunkSize = 3;
  const badgeCategories = useMemo(() => {
    if (!getBadgesCat?.data) return [];

    const res = [];
    for (let i = 0; i < getBadgesCat.data.length; i++) {
      res.push(getBadgesCat.data.slice(i, i + chunkSize));
    }

    return res;
  }, [getBadgesCat?.data]);

  const handleLoadMore = () => {
    if (getBadges?.pageInfo?.cursor) {
      setCursor(JSON.stringify(getBadges.pageInfo.cursor));
    }
  };

  useEffect(() => {
    if (getBadges?.data) {
      setBadges((prev) => [...prev, ...getBadges.data]);
      return;
    }
  }, [getBadges?.data]);

  useEffect(() => {
    setCursor(null);
    setBadges([]);
  }, [keyword]);

  useEffect(() => {
    setCursor(null);
    setBadges([]);
  }, [activeCategory]);

  return (
    <MenuSection>
      <div className="flex flex-col overflow-hidden h-full gap-y-3">
        <div className="px-4 pt-4">
          <Input
            onChange={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            rightSectionPointerEvents="all"
            placeholder="Find badge..."
            leftSection={<IoSearchSharp />}
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
              wrapper: "bg-transparent",
            }}
          />
        </div>

        <div className="grow flex flex-col bg-transparent w-full overflow-y-scroll pl-4 scrollbar pb-4">
          <div className="max-w-full w-full overflow-hidden shrink-0 h-10 mb-5">
            <Carousel
              slideSize="60%"
              height="40"
              slideGap="xs"
              controlsOffset="xs"
              align="start"
              classNames={classes}
            >
              {badgeCategories.map((chunk, index) => (
                <Carousel.Slide key={index}>
                  <div className="flex gap-x-2">
                    {chunk.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        classNames={{
                          root: clsx(
                            "text-[#B7B7CD] border-[#5C5C66] hover:border-[#5C5C66] hover:text-[#B7B7CD] hover:bg-[#2D2D38] font-light transition-all duration-200",
                            {
                              "bg-[#2D2D38] border-[#1BE4C9] text-[#1BE4C9] hover:bg-[#353542] hover:border-[#1BE4C9] hover:text-[#1BE4C9]":
                                category.id === activeCategory,
                            }
                          ),
                        }}
                        onClick={() => {
                          if (category.id === activeCategory) {
                            setActiveCategory("");
                            return;
                          }
                          setActiveCategory(category.id);
                        }}
                      >
                        {category.name}

                        {category.id === activeCategory && (
                          <span className="ml-2 hover:scale-110 transition-transform">
                            <IoMdClose className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>

          {getBadges ? (
            <div className="text-[#8F8FA1] text-sm mb-4">
              {getBadges.pageInfo!.totalRows}{" "}
              {getBadges.pageInfo!.totalRows === 1 ? "result" : "results"} found
            </div>
          ) : (
            <div className="text-[#8F8FA1] text-sm mb-4">0 results found</div>
          )}

          {isGetBadgesLoading && (
            <div className="flex justify-center items-center">
              <Loader color="#B7B7CD" />;
            </div>
          )}

          {badges
            .sort((a, b) => a.level - b.level)
            .map((badge, index) => (
              <div
                key={index}
                className="relative group p-2 hover:bg-[#2D2D38] rounded-lg transition-colors duration-200 flex items-center"
              >
                <button className="absolute top-3 right-3 text-xs bg-[#1B1B22]/50 text-white p-1.5 rounded-md hover:bg-[#1B1B22]/80 transition-colors duration-100 hidden group-hover:block z-10">
                  <BsThreeDots />
                </button>

                <Image
                  src={bucketUrl + badge.path}
                  alt={"meowracle.live | " + badge.name}
                  width={1584}
                  height={396}
                  className="w-16 h-auto cursor-pointer rounded-md hover:opacity-90 transition-opacity duration-200"
                />
                <div className="text-[#B7B7CD] text-sm flex-1 pl-3">
                  {badge.name}
                </div>
              </div>
            ))}

          {getBadges &&
            getBadges.pageInfo?.hasMore &&
            getBadges.pageInfo!.totalRows - badges.length > 0 && (
              <button
                className="w-full py-2 mt-2 text-sm text-[#8F8FA1] hover:text-[#B7B7CD] hover:bg-[#2D2D38] active:scale-95 rounded-lg transition-all duration-200"
                onClick={handleLoadMore}
              >
                Load more ({getBadges.pageInfo!.totalRows - badges.length}{" "}
                remaining)
              </button>
            )}
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-5 -right-10 bg-[#27272F] hover:bg-[#323239] text-[#8F8FA1] p-2 rounded-full transition-all duration-100 ease-in-out"
      >
        <IoMdClose />
      </button>
    </MenuSection>
  );
}

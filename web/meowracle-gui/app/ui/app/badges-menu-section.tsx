import { useBadgeCategories } from "@/app/lib/api/badge-categories";
import { Badge, useBadges } from "@/app/lib/api/badges";
import { Input, CloseButton, Button, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {
  IoSearchSharp,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import MenuSection from "./menu-section";
import Image from "next/image";

export default function BadgesMenuSection({
  onClose,
}: {
  onClose: () => void;
}) {
  const bucketUrl =
    "https://meowracle-bucket-b4922fdf-57d1-4ef8-9971-953640730c71.s3.ap-southeast-1.amazonaws.com/";
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebouncedValue(keyword, 500);
  const [cursor, setCursor] = useState<any>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const { data: getBadgesCat } = useBadgeCategories();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const { data: getBadges, isLoading: isGetBadgesLoading } = useBadges({
    limit: 20,
    keyword: debouncedKeyword === "" ? undefined : debouncedKeyword,
    cursor: cursor ?? undefined,
    categoryId: activeCategory === "" ? undefined : activeCategory,
  });

  const badgeCatRef = React.useRef<HTMLDivElement>(null);

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
    setKeyword("");
    setBadges([]);
  }, [activeCategory]);

  return (
    <MenuSection onClose={onClose}>
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
            <div
              ref={badgeCatRef}
              className="overflow-x-scroll h-auto w-full flex justify-between items-center gap-x-2 no-scrollbar relative"
            >
              <button
                onClick={() => {
                  badgeCatRef.current?.scrollBy({
                    left: -100,
                    behavior: "smooth",
                  });
                }}
                className="sticky flex justify-center items-center text-white p-2 rounded-full transition-colors duration-200 left-0 bg-[#27272F]/80 hover:bg-[#27272F] z-10"
              >
                <IoChevronBackOutline />
              </button>

              {getBadgesCat?.data.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  classNames={{
                    root: clsx(
                      "font-light transition-all duration-200 w-auto shrink-0",
                      {
                        "bg-[#2D2D38] border-[#1BE4C9] text-[#1BE4C9] hover:bg-[#353542] hover:border-[#1BE4C9] hover:text-[#1BE4C9]":
                          category.id === activeCategory,
                      },
                      {
                        "text-[#B7B7CD] border-[#5C5C66] hover:border-[#5C5C66] hover:text-[#B7B7CD] hover:bg-[#2D2D38] ":
                          category.id !== activeCategory,
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

              <button
                onClick={() => {
                  badgeCatRef.current?.scrollBy({
                    left: 100,
                    behavior: "smooth",
                  });
                }}
                className="sticky flex justify-center items-center text-white p-2 rounded-full transition-colors duration-200 right-0 bg-[#27272F]/80 hover:bg-[#27272F] z-10"
              >
                <IoChevronForwardOutline />
              </button>
            </div>
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
    </MenuSection>
  );
}

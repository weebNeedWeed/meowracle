import { useBadgeCategories } from "@/app/lib/api/badge-categories";
import { Badge, useBadges } from "@/app/lib/api/badges";
import { Input, CloseButton, Button, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import {
  IoSearchSharp,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import MenuSection from "./menu-section";
import Image from "next/image";
import { useEditorContext } from "@/app/contexts/editor";

export default function BadgesMenuSection({
  onClose,
}: {
  onClose: () => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebouncedValue(keyword, 500);
  const [cursor, setCursor] = useState<any>(null);

  // store all badges in the state, so we can load more (because we are using cursor-based pagination)
  // each time we load more, we append the new badges to the existing badges
  const [badges, setBadges] = useState<Badge[]>([]);

  const { data: getBadgesCat } = useBadgeCategories();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const { data: getBadges, isLoading: isGetBadgesLoading } = useBadges({
    limit: 20,
    keyword: debouncedKeyword === "" ? undefined : debouncedKeyword,
    cursor: cursor ?? undefined,
    categoryId: activeCategory === "" ? undefined : activeCategory,
  });

  // ref for the badge categories scroll
  const badgeCatRef = React.useRef<HTMLDivElement>(null);
  const [catScrollLeft, setCatScrollLeft] = useState(0);

  // each time the user clicks the load more button, we set the cursor to the last cursor
  // so the next query will fetch the next page
  const handleLoadMore = () => {
    if (getBadges?.pageInfo?.cursor) {
      setCursor(JSON.stringify(getBadges.pageInfo.cursor));
    }
  };

  // append the new badges to the existing badges when loading more
  useEffect(() => {
    if (getBadges?.data) {
      setBadges((prev) => [...prev, ...getBadges.data]);
      return;
    }
  }, [getBadges?.data]);

  // reset the cursor and badges when the keyword changes
  // so we can fetch the new badges based on the new keyword
  useEffect(() => {
    setCursor(null);
    setBadges([]);
  }, [keyword]);

  // reset the cursor and badges when the category changes
  // so we can fetch the new badges based on the new category
  useEffect(() => {
    setCursor(null);
    setKeyword("");
    setBadges([]);
  }, [activeCategory]);

  return (
    <MenuSection onClose={onClose}>
      <div className="flex flex-col h-full gap-y-3">
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

        <div className="flex flex-col bg-transparent w-full overflow-y-scroll pl-4 scrollbar pb-4">
          <div className="max-w-full w-full overflow-hidden shrink-0 h-10 mb-5">
            <div className="relative h-9 flex w-full">
              <button
                onClick={() => {
                  badgeCatRef.current?.scrollBy({
                    left: -100,
                    behavior: "smooth",
                  });
                }}
                className={clsx(
                  "sticky justify-center items-center text-white py-3 transition-colors duration-200 left-0 bg-[#27272F] z-10 flex",
                  {
                    hidden: catScrollLeft === 0,
                  }
                )}
              >
                <IoChevronBackOutline />
              </button>

              <div
                ref={badgeCatRef}
                onScroll={(e) => setCatScrollLeft(e.currentTarget.scrollLeft)}
                className="grow flex w-full gap-x-2 absolute top-0 left-0 h-full items-center overflow-x-scroll no-scrollbar"
              >
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
                  </Button>
                ))}
              </div>

              <button
                onClick={() => {
                  badgeCatRef.current?.scrollBy({
                    left: 100,
                    behavior: "smooth",
                  });
                }}
                className={clsx(
                  "ml-auto sticky justify-center items-center text-white py-3 transition-colors duration-200 right-0 bg-[#27272F] z-10 flex",
                  {
                    hidden:
                      badgeCatRef.current &&
                      badgeCatRef.current.scrollWidth - catScrollLeft ===
                        badgeCatRef.current.clientWidth,
                  }
                )}
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
              <BadgeCard key={index} badge={badge} />
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

function BadgeCard({ badge }: { badge: Badge }) {
  const { dispatch } = useEditorContext();
  const bucketUrl =
    "https://meowracle-bucket-b4922fdf-57d1-4ef8-9971-953640730c71.s3.ap-southeast-1.amazonaws.com/";

  const handleDragStart = () => {
    dispatch({
      type: "SET_DRAGGING",
      badgeImage: badge.path,
    });
  };

  return (
    <div className="relative group p-2 hover:bg-[#2D2D38] rounded-lg transition-colors duration-200 flex items-center">
      {/* <button className="absolute top-3 right-3 text-xs bg-[#1B1B22]/50 text-white p-1.5 rounded-md hover:bg-[#1B1B22]/80 transition-colors duration-100 hidden group-hover:block z-10">
                  <BsThreeDots />
                </button> */}

      <Image
        onDragStart={handleDragStart}
        src={bucketUrl + badge.path}
        alt={"meowracle.live | " + badge.name}
        width={1584}
        height={396}
        className="w-16 h-auto cursor-pointer rounded-md hover:opacity-90 transition-opacity duration-200"
      />
      <div className="text-[#B7B7CD] text-sm flex-1 pl-3">{badge.name}</div>
    </div>
  );
}

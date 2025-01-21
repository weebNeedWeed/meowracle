"use client";

import { useHover } from "@mantine/hooks";
import clsx from "clsx";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function MenuSection({
  children,
  onClose,
  closeOnLeftSide,
}: {
  children: React.ReactNode;
  closeOnLeftSide?: boolean;
  onClose: () => void;
}) {
  const { hovered, ref } = useHover();
  const [actualHovered, setActualHovered] = useState(false);

  // add a close button effect like canva
  // when users hover the menu, show the close button immediately
  // when users leave the menu, wait for 1s before hiding the close button
  useEffect(() => {
    if (hovered) {
      setActualHovered(hovered);
    } else {
      const t = setTimeout(() => {
        setActualHovered(hovered);
      }, 1000);

      return () => clearTimeout(t);
    }
  }, [hovered]);

  return (
    <motion.section
      initial={{ opacity: 0.5, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.2 }}
      className="bg-[#27272F] w-80 max-h-full relative shrink-0"
      ref={ref}
    >
      {children}

      <button
        onClick={onClose}
        className={clsx(
          "absolute top-5 bg-[#27272F] hover:bg-[#323239] text-[#8F8FA1] p-2 rounded-full transition-all duration-100 ease-in-out z-50",
          {
            block: actualHovered,
            hidden: !actualHovered,
          },
          closeOnLeftSide ? "-left-10" : "-right-10"
        )}
      >
        <IoMdClose />
      </button>
    </motion.section>
  );
}

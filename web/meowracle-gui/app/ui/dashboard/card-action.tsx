"use client";

import { PiMagicWandLight } from "react-icons/pi";
import { SiCredly } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { TbHexagonPlus2, TbDownload } from "react-icons/tb";

import {
  Box,
  Card,
  CloseButton,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import classes from "@/app/ui/dashboard/card-action.module.css";
import React, { useState } from "react";
import Image from "next/image";
import { useDragAndDrop } from "@/app/contexts/drag-and-drop";
import { useBadges } from "@/app/lib/api/badges";

const mockdata = [
  // { title: "Edit Photo", icon: HiOutlinePhoto, color: "violet" },
  {
    title: "Choose Template",
    icon: PiMagicWandLight,
    color: "indigo",
    component: AddBadges,
  },
  {
    title: "Add Badges",
    icon: TbHexagonPlus2,
    color: "grape",
    component: AddBadges,
  },
  {
    title: "Scan From Credly",
    icon: SiCredly,
    color: "orange",
    component: AddBadges,
  },
  {
    title: "Scan From Linkedin",
    icon: FaLinkedin,
    color: "indigo",
    component: AddBadges,
  },
  {
    title: "Preview & Export",
    icon: TbDownload,
    color: "dark",
    component: AddBadges,
  },
];

export default function CardAction() {
  const theme = useMantineTheme();
  const [active, setActive] = useState(-1);

  const items = mockdata.map((item, index) => (
    <UnstyledButton
      onClick={() => setActive(index)}
      key={item.title}
      className={classes.item}
    >
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  const RenderItem = active > -1 ? mockdata[active].component : () => null;

  return (
    <Card p={0} className={classes.card}>
      <Group justify="space-between">
        {active === -1 ? (
          <Text className={classes.title}>Menu</Text>
        ) : (
          <CloseButton onClick={() => setActive(-1)} />
        )}
      </Group>
      {active === -1 ? (
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      ) : (
        <Box className="grow overflow-hidden">
          <RenderItem />
        </Box>
      )}
    </Card>
  );
}

function AddBadges() {
  const {
    data: badges,
    isLoading: isBadgesLoading,
    isError: isBadgesError,
  } = useBadges();
  const { setIsDragging, setDragItem } = useDragAndDrop();

  if (isBadgesLoading || isBadgesError || !badges) return <></>;

  return (
    <div className="flex h-full flex-col overflow-auto">
      {badges.map((badge, index) => (
        <Box p={0} mt="xs" key={index} className="w-full">
          <div className="flex justify-center w-full">
            <Image
              src={badge.path}
              draggable={true}
              alt={"Meowracle Badge | " + badge.title}
              width={340}
              height={340}
              className="w-28 h-28 mx-auto cursor-grab active:cursor-grabbing"
              onDragStart={() => {
                setIsDragging(true);
                setDragItem(badge.path);
              }}
            />
          </div>
          <Text size="lg" mt="xs" ta="center">
            {badge.title}
          </Text>
        </Box>
      ))}
    </div>
  );
}

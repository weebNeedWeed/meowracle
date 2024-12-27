"use client";

import { PiMagicWandLight } from "react-icons/pi";
import { SiCredly } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { TbHexagonPlus2, TbDownload } from "react-icons/tb";

import {
  Box,
  Button,
  Card,
  CloseButton,
  Group,
  Modal,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import classes from "@/app/ui/dashboard/card-action.module.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useDragAndDrop } from "@/app/contexts/drag-and-drop";
import { useBadges } from "@/app/lib/api/badges";
import { useTemplates } from "@/app/lib/api/templates";
import { useChooseTemplate } from "@/app/contexts/choose-template";
import { usePreview } from "@/app/contexts/preview";
import { useDisclosure } from "@mantine/hooks";
import { downloadURI } from "@/app/lib/utils";

const mockdata = [
  // { title: "Edit Photo", icon: HiOutlinePhoto, color: "violet" },
  {
    title: "Choose Template",
    icon: PiMagicWandLight,
    color: "indigo",
    component: ChooseTemplates,
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
    component: () => <>Coming Soon</>,
  },
  {
    title: "Scan From Linkedin",
    icon: FaLinkedin,
    color: "indigo",
    component: () => <>Coming Soon</>,
  },
  {
    title: "Preview & Export",
    icon: TbDownload,
    color: "dark",
    component: PreviewAndExport,
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

  const sortedBadges = useMemo(() => {
    if (!badges) return [];
    return badges.sort((a, b) => a.level - b.level);
  }, [badges]);

  if (isBadgesLoading || isBadgesError || !badges)
    return (
      <Box mt="xs" className="flex flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <Box className="flex flex-col" mb="lg" key={index}>
            <Skeleton
              variant="rect"
              width={112}
              height={112}
              className="mx-auto"
            />
            <Skeleton
              mt="xs"
              variant="rect"
              width="90%"
              height={20}
              className="w-full mx-auto"
            />
          </Box>
        ))}
      </Box>
    );

  return (
    <div className="flex h-full flex-col overflow-auto">
      {sortedBadges.map((badge, index) => (
        <Box p={0} mb="sm" key={index} className="w-full">
          <div className="flex justify-center w-full">
            <Tooltip label="Drag to add" position="top">
              <Image
                src={badge.path}
                draggable={true}
                alt={"Meowracle Badge | " + badge.title}
                width={340}
                height={340}
                className="w-28 h-28 mx-auto cursor-grab active:cursor-grabbing transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
                onDragStart={() => {
                  setIsDragging(true);
                  setDragItem(badge.path);
                }}
              />
            </Tooltip>
          </div>
          <Text size="md" ta="center" className="text-shadow" px="md">
            {badge.title}
          </Text>
        </Box>
      ))}
    </div>
  );
}

function ChooseTemplates() {
  const {
    data: templates,
    isLoading: isTemplatesLoading,
    isError: isTemplatesError,
  } = useTemplates();

  const { setChosenId } = useChooseTemplate();

  if (isTemplatesLoading || isTemplatesError || !templates)
    return (
      <Box mt="xs" className="flex flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <Box className="flex flex-col" mb="lg" key={index}>
            <Skeleton variant="rect" height={60} className="w-full" />
            <Skeleton
              mt="xs"
              variant="rect"
              width="95%"
              height={20}
              className="w-full mx-auto"
            />
          </Box>
        ))}
      </Box>
    );

  return (
    <Box mt="xs" className="flex flex-col">
      {templates.map((template, index) => (
        <Box mb="lg" className="flex flex-col" key={index}>
          <Tooltip label={"Click to choose"} position="top">
            <Image
              alt={"Meowracle Template - " + template.title}
              src={template.path}
              height={1584}
              width={396}
              className="w-full mx-auto cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 rounded-md"
              onClick={() => {
                setChosenId(template.id);
              }}
            />
          </Tooltip>

          <Text size="md" mt="xs" ta="center" className="text-shadow" px="md">
            {template.title}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

function PreviewAndExport() {
  const { setIsPreviewActive, previewItem, isPreviewActive, clearPreviewItem } =
    usePreview();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsPreviewActive(true);
    }, 1000);

    return () => {
      clearTimeout(t);
      clearPreviewItem();
    };
  }, [setIsPreviewActive, clearPreviewItem]);

  const handleExport = useCallback(() => {
    if (!previewItem) return;
    downloadURI(previewItem!, "meowracle_exported_image.png");
  }, [previewItem]);

  return (
    <Box mt="xs" className="flex flex-col items-center">
      {isPreviewActive && previewItem ? (
        <Tooltip label="Click to view full" position="top">
          <Image
            onClick={open}
            src={previewItem}
            alt="Meowracle Preview"
            width={1584}
            height={396}
            className="w-full cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
          />
        </Tooltip>
      ) : (
        <Skeleton variant="rect" height={60} className="w-full" />
      )}

      <Button
        disabled={!isPreviewActive || !previewItem}
        fullWidth
        rightSection={<TbDownload size={14} />}
        mt="sm"
        onClick={handleExport}
      >
        Export
      </Button>

      <Modal
        title="Preview"
        opened={opened}
        onClose={close}
        size="xl"
        radius="md"
      >
        <Image
          onClick={open}
          src={previewItem!}
          alt="Meowracle Preview"
          width={1584}
          height={396}
          className="w-full shadow-md rounded-md"
        />
      </Modal>
    </Box>
  );
}

"use client";

import { HiOutlinePhoto } from "react-icons/hi2";
import { PiMagicWandLight } from "react-icons/pi";
import { SiCredly } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { TbHexagonPlus2 } from "react-icons/tb";
import {
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import classes from "@/app/ui/dashboard/card-action.module.css";

const mockdata = [
  { title: "Edit Photo", icon: HiOutlinePhoto, color: "violet" },
  { title: "Choose Template", icon: PiMagicWandLight, color: "indigo" },
  { title: "Choose Certifications", icon: TbHexagonPlus2, color: "grape" },
  { title: "Scan From Credly", icon: SiCredly, color: "orange" },
  { title: "Scan From Linkedin", icon: FaLinkedin, color: "indigo" },
];

export default function CardAction() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card p={0} className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Menu</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}

"use client";

import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/app/ui/menubar.module.css";
import AppLogo from "@/app/ui/app-logo";
import Link from "next/link";

export default function Menubar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box className="fixed top-0 w-full bg-white z-50">
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Link href="/">
              <AppLogo />
            </Link>

            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                Home
              </a>
              <a href="#" className={classes.link}>
                Learn
              </a>
              <a href="#" className={classes.link}>
                Academy
              </a>
            </Group>

            <Group visibleFrom="sm">
              <Link href="/dashboard">
                <Button>Get started</Button>
              </Link>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Link href="/dashboard">
                <Button>Get started</Button>
              </Link>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </Box>
  );
}

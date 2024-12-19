"use client";

import { Button, Container, Text, Title } from "@mantine/core";
import Dots from "@/app/ui/dots";
import classes from "@/app/ui/hero-text.module.css";
import Link from "next/link";

export default function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Showcase{" "}
          <Text component="span" className={classes.highlight} inherit>
            AWS Certs
          </Text>{" "}
          with Stunning Cover Photos!
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Craft a professional LinkedIn Cover Photos in minutes with our
            easy-to-use tool, and download it ready to enhance your profile.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            component="a"
            href="#usage"
          >
            Usage
          </Button>
          <Link href="/dashboard">
            <Button className={classes.control} size="lg">
              Try now! It&apos;s all free 😻
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

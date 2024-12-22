"use client";

import { Container, Text } from "@mantine/core";
import classes from "@/app/ui/dashboard/footer-simple.module.css";

export default function FooterSimple() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text c="dimmed" size="sm">
          © 2024 meowracle.live. All rights reserved.
        </Text>
      </Container>
    </div>
  );
}

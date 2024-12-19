"use client";

import { Anchor, Container, Group, Text } from "@mantine/core";
import classes from "@/app/ui/dashboard/footer-simple.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export default function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

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

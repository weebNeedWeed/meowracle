import { Anchor, Container, Group, Text } from "@mantine/core";
import AppLogo from "./app-logo";
import classes from "./footer.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export function Footer() {
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
        <AppLogo />
        <Group className={classes.links}>{items}</Group>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 meowracle.live. All rights reserved.
        </Text>
      </Container>
    </div>
  );
}

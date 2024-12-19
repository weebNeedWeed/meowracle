"use client";

import { Container, Title, Text } from "@mantine/core";
import classes from "@/app/ui/usage.module.css";

export default function Usage() {
  return (
    <Container className={classes.wrapper}>
      <Text id="usage" className={classes.supTitle}>
        How it works
      </Text>

      <Title className={classes.title}>
        Design Your Professional Cover Images Quickly
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Quickly create a professional cover image to highlight your AWS
          certification, demonstrate your skills, and gain credibility with your
          audience.
        </Text>
      </Container>

      <video autoPlay loop playsInline controls className="h-72 mx-auto mt-8">
        <source
          src="https://videos.pexels.com/video-files/4625518/4625518-uhd_1440_2560_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </Container>
  );
}

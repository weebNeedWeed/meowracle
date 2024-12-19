import { Text } from "@mantine/core";
import Image from "next/image";

export default function AppLogo() {
  return (
    <div className="flex gap-2">
      <Image
        src="/logo.png"
        alt="Meowracle.live logo"
        width={48}
        height={48}
        className="w-8 h-8"
      />
      <Text
        size="xl"
        component="h1"
        variant="gradient"
        fw={900}
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        Meowracle
      </Text>
    </div>
  );
}

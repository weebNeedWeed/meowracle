"use client";

import Link from "next/link";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "@/app/ui/dashboard/navbar.module.css";
import Image from "next/image";
import { TbLibraryPhoto, TbBrandGithub } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { TbBrandX } from "react-icons/tb";

interface NavbarLinkProps {
  icon: typeof TbLibraryPhoto;
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  disabled,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        disabled={disabled || false}
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon size={20} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: TbLibraryPhoto, label: "Create Cover Photos", href: "/dashboard" },
  {
    icon: TbBrandGithub,
    label: "GitHub Badges (coming soon)",
    disabled: true,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const links = mockdata.map((link) => (
    <Link key={link.label} href={link.href || "#"}>
      <NavbarLink {...link} active={pathname === link.href} />
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <Image
          src="/logo.png"
          alt="Meowracle.live logo"
          width={48}
          height={48}
          className="w-8 h-8"
        />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <Link
          href="https://x.com/Meowracle_"
          rel="noopener noreferrer"
          target="_blank"
        >
          <NavbarLink icon={TbBrandX} label="Contact Me" />
        </Link>
      </Stack>
    </nav>
  );
}

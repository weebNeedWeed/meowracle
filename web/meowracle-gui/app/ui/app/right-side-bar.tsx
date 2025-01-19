"use client";

import MenuSection from "./menu-section";

export default function RightSideBar() {
  return (
    <MenuSection onClose={() => console.log(11)} leftSide>
      hello
    </MenuSection>
  );
}

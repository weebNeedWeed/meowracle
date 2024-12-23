"use client";

import dynamic from "next/dynamic";

const NoSSRTemplateEditor = dynamic(() => import("./template-editor"), {
  ssr: false,
});

export default NoSSRTemplateEditor;

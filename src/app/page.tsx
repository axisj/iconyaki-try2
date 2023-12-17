"use client";
import { WrapSection } from "@/styles/wrapper";
import { ModalConfig } from "@/components/ModalConfig";
import { Header } from "@/components/Header";
import { IconBrowser } from "@/components/IconBrowser";
import { ApiErrors } from "@/components/ApiErrors";

export default function Page() {
  return (
    <WrapSection>
      <Header />
      <IconBrowser />
      <ModalConfig />
    </WrapSection>
  );
}

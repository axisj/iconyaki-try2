"use client";
import { WrapSection } from "@/styles/wrapper";
import { Preference } from "@/components/Preference";
import { Header } from "@/components/Header";
import { IconBrowser } from "@/components/IconBrowser";
import { ApiErrors } from "@/components/ApiErrors";

export default function Page() {
  return (
    <WrapSection>
      <Header />
      <IconBrowser />
      <Preference />
    </WrapSection>
  );
}

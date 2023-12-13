"use client";
import { WrapSection } from "@/styles/wrapper";
import { useAppStore } from "@/store/useAppStore";
import { Preference } from "@/components/Preference";

export default function Page() {
  const targetPath = useAppStore((s) => s.targetPath);

  if (targetPath) {
    return (
      <WrapSection>
        <h1>Page</h1>
      </WrapSection>
    );
  }

  return (
    <WrapSection>
      <Preference />
    </WrapSection>
  );
}

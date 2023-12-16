"use client";
import * as React from "react";
import styled from "@emotion/styled";
import { lazy, Suspense, useCallback, useEffect } from "react";
import { useIconsData } from "@/hooks/useIconsData";
import { useAppStore } from "@/store/useAppStore";

interface Props {}

export function IconBrowser({}: Props) {
  const targetPath = useAppStore((s) => s.targetPath);
  const { icons } = useIconsData(targetPath);

  const renderIcon = useCallback(
    (componentName: string) => {
      const Icon = lazy(() => {
        return import(`${targetPath}/files/${componentName}`).catch(() => {
          return import("@/components/icons/files/IconAdd"); // TODO: fallback icon
        });
      });
      return (
        <Suspense fallback={<>L</>}>
          <Icon />
        </Suspense>
      );
    },
    [targetPath],
  );

  return (
    <Container>
      {icons.map((icon, key) => {
        return (
          <div key={key}>
            {icon.componentName}
            {renderIcon(icon.componentName)}
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div``;

"use client";
import * as React from "react";
import { lazy, Suspense, useCallback } from "react";
import styled from "@emotion/styled";
import { useIconsData } from "@/hooks/useIconsData";
import { useAppStore } from "@/store/useAppStore";
import { Spin } from "antd";
import { SMixinFlexColumn } from "@/styles/emotion";

interface Props {}

export function IconBrowser({}: Props) {
  const config = useAppStore((s) => s.config);
  const { icons } = useIconsData(config?.projectName);

  const renderIcon = useCallback(
    (componentName: string) => {
      const Icon = lazy(() => {
        return import(`@/output/${config?.projectName}/files/${componentName}`).catch(() => {
          return import("@/components/IconLoadError");
        });
      });
      return (
        <Suspense fallback={<Spin />}>
          <Icon {...{ iconPath: `@/output/${config?.projectName}/files/${componentName}` }} />
        </Suspense>
      );
    },
    [config?.projectName],
  );

  return (
    <Container>
      {icons.map((icon, key) => {
        return (
          <IconCard key={key}>
            <IconWrap>{renderIcon(icon.componentName)}</IconWrap>
            <IconMeta>{icon.componentName}</IconMeta>
          </IconCard>
        );
      })}
    </Container>
  );
}

const Container = styled.div``;
const IconCard = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
`;
const IconWrap = styled.div`
  ${SMixinFlexColumn("center", "center")};
  font-size: 30px;
  flex: 1;
`;
const IconMeta = styled.div`
  ${SMixinFlexColumn("center", "center")};
  flex: none;
  font-size: 14px;
`;

import * as React from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import { SMixinFlexRow } from "@/styles/emotion";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";

interface Props {}

export function Header({}: Props) {
  const router = useRouter();
  const setConfigOpen = useAppStore((s) => s.setConfigOpen);

  return (
    <Container>
      <Logo>IconYaki</Logo>
      <SearchWrap></SearchWrap>
      <Control>
        <Button onClick={() => setConfigOpen(true)}>Config</Button>
        <Button type={"primary"} onClick={() => router.push("/upload")}>
          Upload
        </Button>
      </Control>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  padding: 8px;
`;
const Logo = styled.div``;
const SearchWrap = styled.div``;
const Control = styled.div`
  ${SMixinFlexRow("flex-end", "center")};
  gap: 5px;
`;

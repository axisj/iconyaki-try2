import * as React from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import { SMixinFlexRow } from "@/styles/emotion";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { pascalCase } from "change-case";

interface Props {}

export function Header({}: Props) {
  const router = useRouter();
  const setPreferenceOpen = useAppStore((s) => s.setConfigOpen);

  // console.log(pascalCase("icon-yaki"));
  // console.log(pascalCase("icon_yaki"));
  // console.log(pascalCase("icon.yaki"));
  // console.log(pascalCase(" yakiTest"));
  // console.log(pascalCase(" yakitest"));
  // console.log(pascalCase(" yaki$test"));
  // console.log(pascalCase("_yaki$test"));

  return (
    <Container>
      <Logo>IconYaki</Logo>
      <SearchWrap></SearchWrap>
      <Control>
        <Button size={"small"} onClick={() => setPreferenceOpen(true)}>
          Preference
        </Button>
        <Button size={"small"} type={"primary"} onClick={() => router.push("/upload")}>
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

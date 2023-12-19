import * as React from "react";
import styled from "@emotion/styled";
import { useAppStore } from "../../store/useAppStore.ts";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { useIconsData } from "../../hooks/useIconsData.ts";
import { confirmDialog } from "../../components/dialogs";
import service from "../../service";
import { IconBin, IconCodeSlash } from "../../components/icon";

interface Props {}

export default function App({}: Props) {
  const config = useAppStore((s) => s.config);
  const { icons, getIcons, loading } = useIconsData(config?.projectName);

  const handleDelete = React.useCallback(
    async (id: string) => {
      if (config?.projectName === undefined) return;
      try {
        await confirmDialog({
          content: "Are you sure you want to delete this icon?",
        });
        await service.deleteIcons({
          projectName: config.projectName,
          id,
        });
        await getIcons();
      } catch (err) {}
    },
    [config?.projectName, getIcons],
  );

  return (
    <Container>
      <h1>Browser</h1>

      {icons.map((icon, key) => {
        return (
          <IconCard key={key}>
            <div className={"tools"}>
              <a href={"#"}>
                <IconCodeSlash />
              </a>
              <a href={"#"} onClick={() => handleDelete(icon.id)}>
                <IconBin />
              </a>
            </div>
            <IconWrap>{icon.componentName}</IconWrap>
            <IconMeta>{icon.componentName}</IconMeta>
          </IconCard>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
`;
const IconCard = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  position: relative;

  .tools {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    display: none;

    a {
      &:hover {
        color: var(--primary);
      }
    }
  }

  &:hover {
    .tools {
      ${SMixinFlexRow("flex-end", "center")};
      gap: 3px;
    }
  }
`;
const IconWrap = styled.div`
  ${SMixinFlexColumn("center", "center")};
  padding: 16px;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
  flex: 1;
`;
const IconMeta = styled.div`
  ${SMixinFlexColumn("center", "center")};
  flex: none;
  font-size: 13px;
  padding: 5px 0;
`;

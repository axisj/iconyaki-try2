import * as React from "react";
import styled from "@emotion/styled";
import { useAppStore } from "../../store/useAppStore.ts";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { useIconsData } from "../../hooks/useIconsData.ts";
import { confirmDialog } from "../../components/dialogs";
import service from "../../service";
import { IconBin, IconCodeSlash } from "../../components/icon";
import Icon from "../../iconyaki/IconYaki.tsx";
import { Popconfirm } from "antd";

interface Props {}

export default function App({}: Props) {
  const currentProject = useAppStore((s) => s.currentProject);

  const { icons, getIcons, loading } = useIconsData(currentProject);

  const handleDelete = React.useCallback(
    async (id: string) => {
      if (currentProject === undefined) return;
      try {
        await service.deleteIcons({
          projectName: currentProject,
          id,
        });
        await getIcons();
      } catch (err) {
        //
      }
    },
    [currentProject, getIcons],
  );

  return (
    <Container>
      <IconCardWrap>
        <IconList>
          {icons.map((icon, key) => {
            const IconPreview = Icon({
              iconStr: icon.svgBody,
              viewBox: "0 0 24 24",
            });
            return (
              <IconCard key={key}>
                <div className={"tools"}>
                  <Popconfirm
                    title={"Are you sure you want to delete this icon?"}
                    onConfirm={() => handleDelete(icon.id)}
                  >
                    <a href={"#"}>
                      <IconBin />
                    </a>
                  </Popconfirm>
                </div>
                <IconWrap>
                  <IconPreview />
                </IconWrap>
                <IconMeta>{icon.componentName}</IconMeta>
              </IconCard>
            );
          })}
        </IconList>
      </IconCardWrap>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: hidden;
`;

const IconCardWrap = styled.div`
  overflow: auto;
  flex: 1;
  background: #eee;
  padding: 8px;
`;
const IconList = styled.div`
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
      color: var(--txt-body);
      &:hover {
        color: var(--txt-link-hover);
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
  border-bottom: 1px solid var(--border-color);
  font-size: 30px;
  flex: 1;
`;
const IconMeta = styled.div`
  ${SMixinFlexColumn("center", "center")};
  flex: none;
  font-size: 13px;
  padding: 5px 0;
`;

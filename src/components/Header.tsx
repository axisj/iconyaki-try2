import * as React from "react";
import styled from "@emotion/styled";
import { Menu, MenuProps } from "antd";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuClickEventHandler } from "rc-menu/lib/interface";

interface Props {}

const itmes: MenuProps["items"] = [
  {
    label: "Icon Browser",
    key: "/",
  },
  {
    label: "Upload",
    key: "/upload",
  },
];

export function Header({}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = useCallback<MenuClickEventHandler>(
    ({ key }) => {
      navigate(key);
    },
    [navigate],
  );

  return (
    <Container>
      <Menu
        mode={"horizontal"}
        items={itmes}
        selectedKeys={[location.pathname]}
        onClick={onClick}
      />
    </Container>
  );
}

const Container = styled.div`
  user-select: none;
  border-bottom: 1px solid var(--border-color);
`;

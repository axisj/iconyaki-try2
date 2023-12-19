import * as React from "react";
import styled from "@emotion/styled";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {}

export default function App({}: Props) {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>System</h1>
      <Divider />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

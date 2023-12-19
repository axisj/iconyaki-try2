import * as React from "react";
import styled from "@emotion/styled";

interface Props {}

export default function App({}: Props) {
  return (
    <Container>
      <h1>Browser</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

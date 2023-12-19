import * as React from "react";
import styled from "@emotion/styled";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.tsx";

interface Props {}

export function Layout({}: Props) {
  return (
    <Container>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
    </Container>
  );
}

const Container = styled.div``;

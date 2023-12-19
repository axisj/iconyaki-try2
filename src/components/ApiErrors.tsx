import * as React from "react";
import styled from "@emotion/styled";
import { useAppStore } from "../store/useAppStore";
import { Alert } from "antd";

interface Props {}

export function ApiErrors({}: Props) {
  const errors = useAppStore((state) => state.errors);
  const setErrors = useAppStore((state) => state.setErrors);

  if (errors?.length === 0) return null;

  return (
    <Container>
      {errors?.map((error, index) => {
        return (
          <Alert
            key={index}
            message={error.message}
            type="error"
            closable
            onClose={() => {
              // TODO: Fix this : 에러를 모두 초기화 하는 코드 개선 필요
              setErrors([]);
            }}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div``;

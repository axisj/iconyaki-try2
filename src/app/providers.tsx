"use client";
import * as React from "react";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { Loading } from "@/components/Loading";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      {loaded ? (
        children
      ) : (
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Loading size={"normal"} active={true} message={"Loading contents"} />
        </div>
      )}
    </ConfigProvider>
  );
}

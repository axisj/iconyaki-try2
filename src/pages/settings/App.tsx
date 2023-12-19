import * as React from "react";
import styled from "@emotion/styled";
import { Button, Divider, Form, Input } from "antd";
import { useCallback, useEffect } from "react";
import service from "../../service";
import { Config } from "../../types";
import { useAppStore } from "../../store/useAppStore.ts";

const FormItem = Form.Item<Config>;

interface Props {}

export default function App({}: Props) {
  const setConfig = useAppStore((s) => s.setConfig);
  const config = useAppStore((s) => s.config);
  const [form] = Form.useForm<Config>();

  const onFinish = useCallback(
    async (values: any) => {
      console.log("save:", values);
      setConfig(values);
    },
    [setConfig],
  );

  useEffect(() => {
    form.setFieldsValue({
      ...config,
    });
  }, [form, config]);

  return (
    <Container>
      <h1>Settings</h1>

      <Form form={form} layout={"vertical"} onFinish={onFinish}>
        <FormItem
          label="Project Name"
          name="projectName"
          rules={[{ required: true }]}
        >
          <Input placeholder={"icon project name"} />
        </FormItem>

        <FormItem label="Icon Prefix" name="iconPrefix">
          <Input placeholder={"Icon Component Prefix"} />
        </FormItem>

        <FormItem>
          <Button htmlType={"submit"}>Save</Button>
        </FormItem>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
`;

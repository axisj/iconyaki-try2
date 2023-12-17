import styled from "@emotion/styled";
import React, { useCallback, useEffect } from "react";
import { Divider, Form, Input, Modal } from "antd";
import { useAppStore } from "@/store/useAppStore";
import service from "@/service";
import { Config } from "@/types";

const FormItem = Form.Item<Config>;

interface ISPinIconProps {
  size?: number;
  strokeWidth?: number;
}

export const ModalConfig: React.FC<ISPinIconProps> = ({ size = 20, strokeWidth = 5 }) => {
  const setConfig = useAppStore((s) => s.setConfig);
  const setConfigOpen = useAppStore((s) => s.setConfigOpen);
  const configOpen = useAppStore((s) => s.configOpen);
  const config = useAppStore((s) => s.config);
  const [form] = Form.useForm<Config>();

  const onFinish = useCallback(
    async (values: any) => {
      console.log("Success:", values);
      await service.saveConfig(values);
      setConfig(values);
      setConfigOpen(false);
    },
    [setConfig, setConfigOpen],
  );

  useEffect(() => {
    form.setFieldsValue({
      ...config,
    });
  }, [form, config]);

  return (
    <Modal
      forceRender
      open={configOpen || !config}
      onCancel={() => setConfigOpen(false)}
      onOk={() => form.submit()}
      cancelButtonProps={{
        disabled: !config,
      }}
    >
      <Container>
        <h1>프로젝트 설정</h1>
        <Divider />
        <Form form={form} layout={"vertical"} onFinish={onFinish}>
          <FormItem label='Project Name' name='projectName' rules={[{ required: true }]}>
            <Input placeholder={"icon project name"} />
          </FormItem>

          <FormItem label='Icon Prefix' name='iconPrefix'>
            <Input placeholder={"Icon Component Prefix"} />
          </FormItem>
        </Form>
      </Container>
    </Modal>
  );
};

const Container = styled.div``;

import styled from "@emotion/styled";
import React, { useCallback, useEffect } from "react";
import { Button, Divider, Form, Input } from "antd";
import { useAppStore } from "@/store/useAppStore";

interface ISPinIconProps {
  size?: number;
  strokeWidth?: number;
}

export const Preference: React.FC<ISPinIconProps> = ({ size = 20, strokeWidth = 5 }) => {
  const setPreference = useAppStore((s) => s.setPreference);
  const iconPrefix = useAppStore((s) => s.iconPrefix);
  const targetPath = useAppStore((s) => s.targetPath);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values: any) => {
      console.log("Success:", values);
      setPreference(values);
    },
    [setPreference],
  );

  useEffect(() => {
    form.setFieldsValue({
      iconPrefix,
      targetPath,
    });
  }, [form, iconPrefix, targetPath]);

  return (
    <Container>
      <h1>Preference</h1>
      <Divider />
      <Form form={form} layout={"vertical"} onFinish={onFinish}>
        <Form.Item label='Target Path' name='targetPath' rules={[{ required: true }]}>
          <Input placeholder={"icon save path (your project icon path)"} />
        </Form.Item>

        <Form.Item label='Icon Prefix' name='iconPrefix'>
          <Input placeholder={"Icon Component Prefix"} />
        </Form.Item>

        <Button type='primary' htmlType='submit'>
          Save
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div``;

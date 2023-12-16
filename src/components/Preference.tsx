import styled from "@emotion/styled";
import React, { useCallback, useEffect } from "react";
import { Button, Divider, Form, Input, Modal } from "antd";
import { useAppStore } from "@/store/useAppStore";
import service from "@/service";

interface ISPinIconProps {
  size?: number;
  strokeWidth?: number;
}

export const Preference: React.FC<ISPinIconProps> = ({ size = 20, strokeWidth = 5 }) => {
  const setPreference = useAppStore((s) => s.setPreference);
  const setPreferenceOpen = useAppStore((s) => s.setPreferenceOpen);
  const openPreference = useAppStore((s) => s.preferenceOpen);
  const iconPrefix = useAppStore((s) => s.iconPrefix);
  const targetPath = useAppStore((s) => s.targetPath);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: any) => {
      console.log("Success:", values);
      await service.savePreference(values);
      setPreference(values);
      setPreferenceOpen(false);
    },
    [setPreference, setPreferenceOpen],
  );

  useEffect(() => {
    form.setFieldsValue({
      iconPrefix,
      targetPath,
    });
  }, [form, iconPrefix, targetPath]);

  return (
    <Modal forceRender open={openPreference} onCancel={() => setPreferenceOpen(false)} onOk={() => form.submit()}>
      <Container>
        <h1>프로젝트 설정</h1>
        <Divider />
        <Form form={form} layout={"vertical"} onFinish={onFinish}>
          <Form.Item label='Target Path' name='targetPath' rules={[{ required: true }]}>
            <Input placeholder={"icon save path (your project icon path)"} />
          </Form.Item>

          <Form.Item label='Icon Prefix' name='iconPrefix'>
            <Input placeholder={"Icon Component Prefix"} />
          </Form.Item>
        </Form>
      </Container>
    </Modal>
  );
};

const Container = styled.div``;

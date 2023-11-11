"use client";
import * as React from "react";
import styled from "@emotion/styled";
import { FileDto } from "@/types";
import { uploadFile } from "@/components/uploadFile";
import { Button, Card, Descriptions, Input, Space } from "antd";
import { toByte } from "@/util/toByte";
import { SMixinFlexColumn } from "@/styles/emotion";

interface Props {
  accept?: string;
}

export function SvgUploader({ accept = "*/*" }: Props) {
  const [spinning, setSpinning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState<FileDto[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const abortController = React.useRef(new AbortController()).current;

  const onChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      const uploadFiles: FileDto[] = [];

      try {
        setSpinning(true);

        const uploadFileCount = event.target.files.length;

        for (let i = 0; i < uploadFileCount; i++) {
          const file = event.target.files[i];
          const data = await uploadFile({
            file,
            signal: abortController.signal,
            onUploadProgress: (progressEvent) => {
              console.log("progressEvent", progressEvent);

              if (file) {
                const alreadyUploadPercent = Math.round((i / uploadFileCount) * 100);
                const percent = Math.round(
                  alreadyUploadPercent + (Math.min(progressEvent.loaded / file.size, 1) * 100) / uploadFileCount,
                );
                setProgress(percent);
              }
            },
          });

          if (data.error) {
            throw new Error(data.error);
          } else {
            uploadFiles.push(data);
          }
        }

        setUploadedFiles([...uploadedFiles, ...uploadFiles]);
      } catch (err: any) {
        // await errorHandling(err);
        console.error(err);
      } finally {
        setSpinning(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [abortController.signal, uploadedFiles],
  );

  const handleButtonClick = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <Container>
      <input type='file' accept={accept} multiple ref={inputRef} onChange={onChange} style={{ display: "none" }} />

      <Space size={5}>
        <Button type={"primary"} onClick={handleButtonClick} loading={spinning}>
          {"Select SVG Files"}
          {spinning && `(${progress}%)`}
        </Button>
        {spinning && (
          <Button
            type={"text"}
            danger
            onClick={() => {
              abortController.abort();
            }}
          >
            취소
          </Button>
        )}
      </Space>

      <FileList>
        {uploadedFiles.map((file, key) => (
          <UploadedFile
            key={key}
            title={file.fileName}
            extra={
              <Button type={"text"} danger>
                삭제
              </Button>
            }
          >
            <Descriptions>
              <Descriptions.Item label='FileSize'>{toByte(file.fileSize)}</Descriptions.Item>
            </Descriptions>

            <Input.TextArea rows={6} value={file.rawContents} />
          </UploadedFile>
        ))}
      </FileList>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("flex-start", "flex-start")};
  gap: 1rem;
`;

const FileList = styled.div`
  ${SMixinFlexColumn("", "stretch")};
  gap: 1rem;
`;

const UploadedFile = styled(Card)``;

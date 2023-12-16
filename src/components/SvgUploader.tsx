"use client";
import * as React from "react";
import styled from "@emotion/styled";
import { FileDto } from "@/types";
import { Button, Card, Descriptions, Input, Space } from "antd";
import { toByte } from "@/util/toByte";
import { SMixinFlexColumn } from "@/styles/emotion";
import { dangerouslySetInnerHTML } from "@/util/dangerouslySetInnerHTML";
import { pascalCase } from "change-case";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import service from "@/service";

interface Props {
  accept?: string;
}

export function SvgUploader({ accept = "*/*" }: Props) {
  const router = useRouter();
  const targetPath = useAppStore((s) => s.targetPath);
  const iconPrefix = useAppStore((s) => s.iconPrefix);
  const [spinning, setSpinning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState<FileDto[]>([]);
  const [uploading, setUploading] = React.useState(false);

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
          const data = await service.uploadFile({
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

          uploadFiles.push(data);
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

  const removeFile = React.useCallback(
    (index: number) => {
      setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    },
    [uploadedFiles],
  );

  const handleButtonClick = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleGenerateIcon = React.useCallback(async () => {
    setUploading(true);
    try {
      for await (const file of uploadedFiles) {
        if (file.fileName && file.rawContents) {
          await service.generateIcon({
            fileName: file.fileName,
            contents: file.rawContents,
            signal: abortController.signal,
            targetPath: targetPath ?? "",
            iconPrefix,
          });
        }
      }
      setUploading(false);
      setUploadedFiles([]);
      router.push("/");
    } catch (err: any) {
      // await errorHandling(err);
      console.error(err);
    }
  }, [abortController.signal, iconPrefix, router, targetPath, uploadedFiles]);

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
              <Button type={"text"} danger onClick={() => removeFile(key)}>
                삭제
              </Button>
            }
          >
            <Descriptions>
              <Descriptions.Item label='File Size'>{toByte(file.fileSize)}</Descriptions.Item>
              <Descriptions.Item label='Component Name'>
                {pascalCase(iconPrefix + "_" + file.fileName) + ".tsx"}
              </Descriptions.Item>
            </Descriptions>

            <IconPreview {...dangerouslySetInnerHTML(file.rawContents)} />

            <Input.TextArea rows={6} value={file.rawContents} onResize={() => {}} />
          </UploadedFile>
        ))}
      </FileList>

      {uploadedFiles.length > 0 && (
        <Space>
          <Button type={"primary"} onClick={() => handleGenerateIcon()} loading={uploading}>
            Generate Icon
          </Button>
        </Space>
      )}
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

const IconPreview = styled.div`
  font-size: 32px;
  padding: 10px;
  border: 1px solid var(--border-color);
  margin-bottom: 10px;
  width: auto;
  svg {
    width: 1em;
    height: 1em;
    display: block;
  }
`;

const UploadedFile = styled(Card)``;

import * as React from "react";
import styled from "@emotion/styled";
import { FileDto } from "../../types";
import service from "../../service";
import { useAppStore } from "../../store/useAppStore.ts";
import { Button, Card, Descriptions, Input, Space } from "antd";
import { pascalCase } from "change-case";
import { SMixinFlexColumn } from "../../styles/emotion";
import { dangerouslySetInnerHTML } from "../../util/dangerouslySetInnerHTML.ts";
import { toByte } from "../../util/toByte.ts";

interface Props {
  accept?: string;
}

export default function App({ accept = "image/svg+xml" }: Props) {
  const config = useAppStore((s) => s.config);
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
                const alreadyUploadPercent = Math.round(
                  (i / uploadFileCount) * 100,
                );
                const percent = Math.round(
                  alreadyUploadPercent +
                    (Math.min(progressEvent.loaded / file.size, 1) * 100) /
                      uploadFileCount,
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
            projectName: config?.projectName ?? "",
            iconPrefix: config?.iconPrefix ?? "",
          });
        }
      }
      setUploading(false);
      setUploadedFiles([]);
    } catch (err: any) {
      // await errorHandling(err);
      console.error(err);
    }
  }, [abortController.signal, config, uploadedFiles]);

  return (
    <Container>
      <h1>Upload</h1>

      <input
        type="file"
        accept={accept}
        multiple
        ref={inputRef}
        onChange={onChange}
        style={{ display: "none" }}
      />

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
            Cancel
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
              <Descriptions.Item label="File Size">
                {toByte(file.fileSize)}
              </Descriptions.Item>
              <Descriptions.Item label="Component Name">
                {pascalCase((config?.iconPrefix ?? "") + "_" + file.fileName) +
                  ".tsx"}
              </Descriptions.Item>
            </Descriptions>

            <IconPreview {...dangerouslySetInnerHTML(file.rawContents)} />

            <Input.TextArea
              rows={6}
              value={file.rawContents}
              onResize={() => {}}
            />
          </UploadedFile>
        ))}
      </FileList>

      {uploadedFiles.length > 0 && (
        <Space>
          <Button
            type={"primary"}
            onClick={() => handleGenerateIcon()}
            loading={uploading}
          >
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
  padding: 8px;
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

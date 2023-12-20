import * as React from "react";
import { useRef } from "react";
import styled from "@emotion/styled";
import { FileDto } from "../../types";
import service from "../../service";
import { useAppStore } from "../../store/useAppStore.ts";
import {
  Button,
  Divider,
  Form,
  Input,
  InputRef,
  message,
  Select,
  Space,
} from "antd";
import { SMixinFlexColumn, SMixinFlexRow } from "../../styles/emotion";
import { dangerouslySetInnerHTML } from "../../util/dangerouslySetInnerHTML.ts";
import { toByte } from "../../util/toByte.ts";
import { LabelText, LabelTextGroup } from "../../components/LabelText.tsx";
import { IconBin } from "../../components/icon";
import { useNavigate } from "react-router-dom";

interface Props {
  accept?: string;
}

export default function App({ accept = "image/svg+xml" }: Props) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const currentProject = useAppStore((s) => s.currentProject);
  const setCurrentProject = useAppStore((s) => s.setCurrentProject);
  const projects = useAppStore((s) => s.projects);
  const setProjects = useAppStore((s) => s.setProjects);
  const [spinning, setSpinning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState<FileDto[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [openSelect, setOpenSelect] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const addProjectRef = useRef<InputRef>(null);
  const abortController = React.useRef(new AbortController()).current;

  const [form] = Form.useForm();

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
    if (!currentProject) {
      messageApi.error("Please select 'Project Name'");
      return;
    }
    try {
      for await (const file of uploadedFiles) {
        if (file.fileName && file.rawContents) {
          await service.generateIcon({
            fileName: file.fileName,
            contents: file.rawContents,
            projectName: currentProject,
          });
        }
      }
      setUploading(false);
      setUploadedFiles([]);
      navigate("/");
    } catch (err: any) {
      // await errorHandling(err);
      console.error(err);
    }
  }, [currentProject, messageApi, navigate, uploadedFiles]);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();

    if (!name) {
      messageApi.error("Please enter 'Project Name'");
      return;
    }

    setProjects([
      ...(projects ?? []),
      {
        label: name ?? "",
        value: name ?? "",
      },
    ]);
    setCurrentProject(name);
    form.setFieldValue("project", name);
    setName("");
    form.validateFields(["project"]);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Container>
      {contextHolder}

      <input
        type="file"
        accept={accept}
        multiple
        ref={inputRef}
        onChange={onChange}
        style={{ display: "none" }}
      />

      <FileListWrap>
        <FileList>
          {uploadedFiles.map((file, key) => (
            <UploadedFile key={key}>
              <IconPreview {...dangerouslySetInnerHTML(file.rawContents)} />

              <MetaInfos>
                <LabelText label={"Name"}>{file.fileName}</LabelText>
                <LabelText label={"Size"}>{toByte(file.fileSize)}</LabelText>
              </MetaInfos>

              <Button size={"small"} danger onClick={() => removeFile(key)}>
                삭제
              </Button>
            </UploadedFile>
          ))}
        </FileList>
      </FileListWrap>

      <Toolbar>
        <Space size={5}>
          <Button
            type={"primary"}
            onClick={handleButtonClick}
            loading={spinning}
          >
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

        {(uploadedFiles.length > 0 || true) && (
          <Form form={form} layout={"inline"} onFinish={handleGenerateIcon}>
            <Form.Item
              name={"project"}
              label={"projectName"}
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={currentProject}
            >
              <Select
                open={openSelect}
                onDropdownVisibleChange={(open) => {
                  setOpenSelect(open);
                }}
                dropdownRender={(menu) => (
                  <>
                    {(projects ?? []).length > 0 ? (
                      projects?.map((project, key) => (
                        <ProjectItem key={key}>
                          <a
                            onClick={() => {
                              setCurrentProject(project.value);
                              form.setFieldValue("project", project.value);
                              form.validateFields(["project"]);
                              setOpenSelect(false);
                            }}
                          >
                            {project.label}
                          </a>
                          <Button
                            type={"text"}
                            size={"small"}
                            onClick={() => {
                              setProjects(
                                projects.filter(
                                  (p) => p.value !== project.value,
                                ),
                              );
                              if (currentProject === project.value) {
                                setCurrentProject(undefined);
                                form.setFieldValue("project", undefined);
                              } else {
                                setOpenSelect(false);
                              }
                            }}
                          >
                            <IconBin />
                          </Button>
                        </ProjectItem>
                      ))
                    ) : (
                      <ProjectItem>"No Project"</ProjectItem>
                    )}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Project Name"
                        ref={addProjectRef}
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button type="text" onClick={addItem}>
                        Add
                      </Button>
                    </Space>
                  </>
                )}
                options={projects}
                style={{ minWidth: 240 }}
              />
            </Form.Item>

            <Button
              type={"primary"}
              onClick={() => form.submit()}
              loading={uploading}
            >
              Generate Icon
            </Button>
          </Form>
        )}
      </Toolbar>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: hidden;
`;

const FileListWrap = styled.div`
  flex: 1;
  overflow: auto;
  background: #eee;
  padding: 8px;
`;

const Toolbar = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  flex: none;
  padding: 8px;
  border-top: 1px solid var(--border-color);
`;

const FileList = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const UploadedFile = styled.div`
  ${SMixinFlexColumn("center", "center")};
  padding: 16px 8px;
  border: 1px solid var(--border-color);
  font-size: 30px;
  border-radius: 8px;
  background: #fff;
  gap: 8px;
`;
const IconPreview = styled.div`
  width: auto;
  svg {
    width: 1em;
    height: 1em;
    display: block;
  }

  padding: 16px;
  border: 1px solid var(--border-color);
  background: var(--border-color);
  font-size: 30px;
`;

const MetaInfos = styled(LabelTextGroup)`
  font-size: 14px;
  flex-wrap: wrap;
`;

const ProjectItem = styled.div`
  ${SMixinFlexRow("stretch", "center")};
  padding: 5px 8px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  a {
    display: block;
    flex: 1;
    cursor: pointer;
    color: var(--txt-body);
    &:hover {
      color: var(--txt-link-hover);
    }
  }
`;

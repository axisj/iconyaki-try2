import axios, { AxiosProgressEvent } from "axios";

export interface UploadFileProps {
  file: File;
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const uploadFile = async ({ file, signal, onUploadProgress }: UploadFileProps) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axios.post("/api/upload", formData, {
    signal,
    onUploadProgress,
  });

  return data;
};

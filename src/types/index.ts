export interface FileDto {
  fileName: string;
  fileSize: number;
  rawContents: string;
  jsonContents: Record<string, any>;
}

export interface IconyakiIcon {
  fileName: string;
  componentName: string;
  tags: string[];
  rawFileContents: string;
}

export interface IconyakiData {
  icons: IconyakiIcon[];
}

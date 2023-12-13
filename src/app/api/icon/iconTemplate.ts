interface Props {
  fileName: string;
  viewBox: string;
  contents: string;
}
export const getIconTemplate = ({ fileName, viewBox, contents }: Props) =>
  `import Icon from "../IconYaki";

const IconBody = \`${contents}\`;

export default Icon({
  iconStr: IconBody,
  viewBox: "${viewBox}",
});
`;

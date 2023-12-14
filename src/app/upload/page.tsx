import { WrapSection } from "@/styles/wrapper";
import { SvgUploader } from "@/components/SvgUploader";

export default function Page() {
  return (
    <WrapSection>
      <SvgUploader accept={"image/svg+xml"} />
    </WrapSection>
  );
}

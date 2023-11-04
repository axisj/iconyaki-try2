import { WrapSection } from "@/styles/wrapper";
import { MultiFileUploader } from "@/components/MultiFileUploader";

export default function Page() {
  return (
    <WrapSection>
      <h1>upload</h1>
      <MultiFileUploader />
    </WrapSection>
  );
}

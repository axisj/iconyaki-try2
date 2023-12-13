import { WrapSection } from "@/styles/wrapper";
import { SvgUploader } from "@/components/SvgUploader";
import AxisjSymbol from "@/dist/icons/AxisjSymbol";
import ArrowCircleDown_5 from "@/dist/icons/ArrowCircleDown_5";
import PhoneCircle from "@/dist/icons/PhoneCircle";
import { Button } from "antd";
import { StepBackwardOutlined } from "@ant-design/icons";

export default function Page() {
  return (
    <WrapSection>
      <SvgUploader accept={"image/svg+xml"} />

      <div
        style={{
          fontSize: 20,
        }}
      >
        <AxisjSymbol />
        <ArrowCircleDown_5 />
        <PhoneCircle />
      </div>

      <Button icon={<ArrowCircleDown_5 />}>TEST</Button>
      <Button icon={<StepBackwardOutlined />}>TEST</Button>
    </WrapSection>
  );
}

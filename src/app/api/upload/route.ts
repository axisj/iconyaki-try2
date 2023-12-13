import { NextRequest, NextResponse } from "next/server";
import xml2js from "xml2js";
import { FileDto } from "@/types";

const xmlBuilder = new xml2js.Builder({
  headless: true,
});

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({
      error: {
        message: "file is empty",
      },
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = file.name;
  const fileSize = file.size;
  const rawContents = buffer.toString("utf-8");
  const jsonContents = (await xml2js.parseStringPromise(rawContents)) as Record<string, any>;
  const { $, metadata, title, desc, defs, ...rest } = jsonContents.svg;
  const trimJson: Record<string, any> = {
    svg: {
      $: {
        xmlns: $.xmlns,
        viewBox: $.viewBox,
      },
      ...rest,
    },
  };

  const xml = xmlBuilder.buildObject(trimJson);

  const uploadedFile: FileDto = { fileName, fileSize, rawContents: xml, jsonContents: trimJson };

  return NextResponse.json(uploadedFile);
}

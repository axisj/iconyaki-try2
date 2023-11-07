import { NextRequest, NextResponse } from "next/server";
import xml2js from "xml2js";

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
  const rawContents = buffer.toString("utf-8");
  const jsonContents = await xml2js.parseStringPromise(rawContents);

  return NextResponse.json({ fileName, rawContents, jsonContents });
}

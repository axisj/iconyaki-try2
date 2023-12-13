import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import xml2js from "xml2js";
import { getIconTemplate } from "@/app/api/icon/iconTemplate";
import { pascalCase } from "pascal-case";

interface IconSaveRequest {
  fileName: string;
  contents: string;
}

export async function POST(request: NextRequest) {
  const body: IconSaveRequest = await request.json();

  body.fileName = body.fileName.replace(/\.svg$/, "");
  const path = join(process.cwd(), "src", "dist", "icons", pascalCase(body.fileName) + ".tsx");

  const jsonContents = (await xml2js.parseStringPromise(body.contents)) as Record<string, any>;
  const { $, ...rest } = jsonContents.svg;
  const trimJson: Record<string, any> = {
    ...rest,
  };
  const iconBody = body.contents.replace(/<svg .*>/g, "").replace(/<\/svg>/g, "");
  const fileContents = getIconTemplate({
    fileName: pascalCase(body.fileName) + ".tsx",
    viewBox: $.viewBox,
    contents: iconBody,
  });

  await writeFile(path, fileContents, "utf-8");

  return NextResponse.json({
    path,
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({});
}

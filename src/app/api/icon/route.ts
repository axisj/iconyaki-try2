import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import xml2js from "xml2js";
import { getIconTemplate } from "@/app/api/icon/iconTemplate";
import { pascalCase } from "pascal-case";
import { IconyakiData } from "@/iconyaki/@types";
import * as fs from "fs";

interface SaveIconRequest {
  fileName: string;
  contents: string;
  targetPath: string;
}

interface GetIconsRequest {
  targetPath: string;
}

export async function POST(request: NextRequest) {
  const body: SaveIconRequest = await request.json();

  if (!fs.existsSync(join(process.cwd(), body.targetPath))) {
    fs.cpSync(join(process.cwd(), "src", "iconyaki"), join(process.cwd(), body.targetPath), { recursive: true });
  }

  const fileName = body.fileName.replace(/\.svg$/, "");
  const path = join(process.cwd(), body.targetPath, "icons", pascalCase(fileName) + ".tsx");

  const jsonString = await readFile(join(process.cwd(), body.targetPath, "data.json"), "utf-8");
  const data = JSON.parse(jsonString) as IconyakiData;

  data.icons.push({
    fileName: pascalCase(fileName) + ".tsx",
    componentName: pascalCase(fileName),
    tags: [],
    rawFileContents: body.contents,
  });

  const jsonContents = (await xml2js.parseStringPromise(body.contents)) as Record<string, any>;
  const { $ } = jsonContents.svg;

  const iconBody = body.contents.replace(/<svg .*>/g, "").replace(/<\/svg>/g, "");
  const fileContents = getIconTemplate({
    fileName: pascalCase(fileName) + ".tsx",
    viewBox: $.viewBox,
    contents: iconBody,
  });

  await writeFile(path, fileContents, "utf-8");
  await writeFile(join(process.cwd(), body.targetPath, "data.json"), JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({
    path,
  });
}

export async function GET(request: NextRequest) {
  const body: GetIconsRequest = await request.json();

  if (!fs.existsSync(join(process.cwd(), body.targetPath))) {
    fs.cpSync(join(process.cwd(), "src", "iconyaki"), join(process.cwd(), body.targetPath), { recursive: true });
  }

  const jsonString = await readFile(join(process.cwd(), body.targetPath, "data.json"), "utf-8");
  const data = JSON.parse(jsonString) as IconyakiData;

  return NextResponse.json(data as IconyakiData);
}

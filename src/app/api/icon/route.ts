import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import xml2js from "xml2js";
import { getIconTemplate } from "@/app/api/icon/iconTemplate";
import { pascalCase } from "change-case";
import { IconyakiData } from "@/iconyaki/@types";
import * as fs from "fs";
import { getSavePath } from "@/app/api/getSavePath";
import { Config } from "@/types";

export interface SaveIconRequest extends Config {
  fileName: string;
  contents: string;
}

interface GetIconsRequest {
  targetPath: string;
}

export async function POST(request: NextRequest) {
  const body: SaveIconRequest = await request.json();

  const targetPath = getSavePath(body.projectName);
  const iconPrefix = body.iconPrefix ?? "";

  const fileName = body.fileName.replace(/\.svg$/, "");
  const componentName = pascalCase(iconPrefix + "_" + fileName);
  const path = targetPath + "/files/" + componentName + ".tsx";

  const jsonString = await readFile(targetPath + "/data.json", "utf-8");
  const data = JSON.parse(jsonString) as IconyakiData;

  data.icons.push({
    fileName: componentName + ".tsx",
    componentName,
    tags: [],
    rawFileContents: body.contents,
  });

  const jsonContents = (await xml2js.parseStringPromise(body.contents)) as Record<string, any>;
  const { $ } = jsonContents.svg;

  const iconBody = body.contents.replace(/<svg .*>/g, "").replace(/<\/svg>/g, "");
  const fileContents = getIconTemplate({
    fileName: componentName + ".tsx",
    viewBox: $.viewBox,
    contents: iconBody,
  });

  await writeFile(path, fileContents, "utf-8");
  await writeFile(targetPath + "/data.json", JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({
    path,
  });
}

export async function GET(request: NextRequest) {
  const body = request.nextUrl.searchParams;

  const projectName = body.get("projectName");
  if (!projectName) {
    return NextResponse.json({
      error: {
        code: 500,
        message: "data.json not found",
      },
    });
  }

  const targetPath = getSavePath(projectName);

  if (!fs.existsSync(targetPath + "/data.json")) {
    return NextResponse.json({
      error: {
        code: 500,
        message: "data.json not found",
      },
    });
  }

  const jsonString = await readFile(targetPath + "/data.json", "utf-8");
  const data = JSON.parse(jsonString) as IconyakiData;

  return NextResponse.json(data as IconyakiData);
}

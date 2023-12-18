import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import xml2js from "xml2js";
import { getIconTemplate } from "@/app/api/icon/iconTemplate";
import { pascalCase } from "change-case";
import { getSavePath } from "@/app/api/getSavePath";
import { Config } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { JsonRepository } from "@/app/api/JsonRepository";
import { unlink, unlinkSync } from "fs";

export interface SaveIconRequest extends Config {
  fileName: string;
  contents: string;
}

export async function POST(request: NextRequest) {
  const body: SaveIconRequest = await request.json();

  const targetPath = getSavePath(body.projectName);
  const iconPrefix = body.iconPrefix ?? "";
  const jsonRepository = new JsonRepository(targetPath, "data.json");

  const fileName = body.fileName.replace(/\.svg$/, "");
  const componentName = pascalCase(iconPrefix + "_" + fileName);
  const path = targetPath + "/files/" + componentName + ".tsx";

  const jsonContents = (await xml2js.parseStringPromise(body.contents)) as Record<string, any>;
  const { $ } = jsonContents.svg;

  const iconBody = body.contents.replace(/<svg .*>/g, "").replace(/<\/svg>/g, "");
  const fileContents = getIconTemplate({
    fileName: componentName + ".tsx",
    viewBox: $.viewBox,
    contents: iconBody,
  });

  {
    // save data.json
    const data = await jsonRepository.read();

    data.icons.push({
      id: uuidv4(),
      fileName: componentName + ".tsx",
      componentName,
      tags: [],
      rawFileContents: body.contents,
    });

    await writeFile(path, fileContents, "utf-8");
    await jsonRepository.save(data);
  }

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
  const jsonRepository = new JsonRepository(targetPath, "data.json");
  const data = await jsonRepository.read();

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const body = request.nextUrl.searchParams;

  const projectName = body.get("projectName");
  const id = body.get("id");
  if (!projectName) {
    return NextResponse.json({
      error: {
        code: 500,
        message: "data.json not found",
      },
    });
  }

  const targetPath = getSavePath(projectName);
  const jsonRepository = new JsonRepository(targetPath, "data.json");
  const data = await jsonRepository.read();

  const deleteFileName = data.icons.find((icon) => icon.id === id)?.fileName;

  data.icons = data.icons.filter((icon) => icon.id !== id);

  unlinkSync(targetPath + "/files/" + deleteFileName);
  await jsonRepository.save(data);

  return NextResponse.json({
    result: "ok",
  });
}

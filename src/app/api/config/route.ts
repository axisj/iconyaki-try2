import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import xml2js from "xml2js";
import { getIconTemplate } from "@/app/api/icon/iconTemplate";
import { pascalCase } from "pascal-case";
import { IconyakiData } from "@/iconyaki/@types";
import * as fs from "fs";

interface PutConfigRequest {
  targetPath: string;
  iconPrefix?: string;
}

export async function PUT(request: NextRequest) {
  const body: PutConfigRequest = await request.json();

  if (!fs.existsSync(join(process.cwd(), body.targetPath))) {
    fs.cpSync(join(process.cwd(), "src", "iconyaki"), join(process.cwd(), body.targetPath), { recursive: true });
  }

  return NextResponse.json({});
}

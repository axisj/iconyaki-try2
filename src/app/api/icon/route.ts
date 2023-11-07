import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

interface IconSaveRequest {
  fileName: string;
  contents?: string;
}

export async function POST(request: NextRequest) {
  const body: IconSaveRequest = await request.json();
  const path = join(process.cwd(), "uploads", body.fileName);
  await writeFile(path, body.contents ?? "", "utf-8");

  return NextResponse.json({
    path,
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({});
}

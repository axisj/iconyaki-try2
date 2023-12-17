import { NextRequest, NextResponse } from "next/server";
import { getSavePath } from "@/app/api/getSavePath";
import { Config } from "@/types";

interface PutConfigRequest extends Config {}

export async function PUT(request: NextRequest) {
  const body: PutConfigRequest = await request.json();

  getSavePath(body.projectName);

  return NextResponse.json({});
}

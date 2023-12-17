import fs from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { ApiError } from "@/service/ApiError";

export const getSavePath = (projectName?: string) => {
  if (!projectName) {
    throw new ApiError(500, "projectName is required");
  }

  const savePath = join(process.cwd(), "src", "output", projectName);
  if (!fs.existsSync(savePath)) {
    fs.cpSync(join(process.cwd(), "src", "iconyaki"), savePath, { recursive: true });
    fs.mkdirSync(savePath + "/files");
  }
  return savePath;
};

import { readFile, writeFile } from "fs/promises";
import { IconyakiData } from "@/iconyaki/@types";
import fs from "fs";
import { NextResponse } from "next/server";
import { ApiError } from "@/service/ApiError";

export class JsonRepository {
  private targetPath: string;
  private fileName: string;

  constructor(targetPath: string, fileName: string = "data.json") {
    this.targetPath = targetPath;
    this.fileName = fileName;
  }

  public async read(): Promise<IconyakiData> {
    if (!fs.existsSync(this.targetPath + "/" + this.fileName)) {
      throw new ApiError(500, "data.json not found");
    }

    const jsonString = await readFile(this.targetPath + "/" + this.fileName, "utf-8");
    return JSON.parse(jsonString) as IconyakiData;
  }

  public async save(data: IconyakiData): Promise<void> {
    if (!fs.existsSync(this.targetPath + "/" + this.fileName)) {
      throw new ApiError(500, "data.json not found");
    }

    await writeFile(this.targetPath + "/" + this.fileName, JSON.stringify(data, null, 2), "utf-8");
  }
}

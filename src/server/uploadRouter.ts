import express from "express";
import xml2js from "xml2js";
import { FileDto } from "../types";
import multer from "multer";
const upload = multer();

const xmlBuilder = new xml2js.Builder({
  headless: true,
});

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  const file: Express.Multer.File | undefined = req.file;

  if (!file) {
    return res.json({
      error: {
        message: "file is empty",
      },
    });
  }

  const bytes = file.buffer;
  const buffer = Buffer.from(bytes);
  const fileName = file.originalname;
  const fileSize = file.size;
  const rawContents = buffer.toString("utf-8");
  const jsonContents = (await xml2js.parseStringPromise(rawContents)) as Record<
    string,
    any
  >;
  const { $, metadata, title, desc, defs, ...rest } = jsonContents.svg;
  const trimJson: Record<string, any> = {
    svg: {
      $: {
        xmlns: $.xmlns,
        viewBox: $.viewBox,
      },
      ...rest,
    },
  };

  const xml = xmlBuilder.buildObject(trimJson);

  const uploadedFile: FileDto = {
    fileName: fileName,
    fileSize,
    rawContents: xml,
    jsonContents: trimJson,
  };

  return res.json(uploadedFile);
});

export default router;

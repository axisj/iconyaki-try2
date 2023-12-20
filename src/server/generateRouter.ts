import express from "express";
import xml2js from "xml2js";

const router = express.Router();

router.post("/parse-xml", async (req, res) => {
  const contents = req.body.contents;

  const jsonContents = (await xml2js.parseStringPromise(contents)) as Record<
    string,
    any
  >;

  return res.json({
    jsonContents,
  });
});

export default router;

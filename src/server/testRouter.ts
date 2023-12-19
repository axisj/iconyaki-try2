import express from "express";
const router = express.Router();

router.get("/", (_, res) => res.json({ greeting: "Hello" }));
router.get("/child", (_, res) => res.json({ second: "Second" }));

export default router;

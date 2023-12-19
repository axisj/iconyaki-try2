import express from "express";
import uploadRouter from "./uploadRouter.ts";

export const app = express();

app.use("/api", uploadRouter);

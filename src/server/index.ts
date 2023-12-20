import express from "express";
import uploadRouter from "./uploadRouter.ts";
import generateRouter from "./generateRouter.ts";

export const app = express();
app.use(express.json());

app.use("/api", uploadRouter);
app.use("/api", generateRouter);

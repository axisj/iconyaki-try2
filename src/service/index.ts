import { getIcons } from "@/service/getIcons";
import { generateIcon } from "@/service/generateIcon";
import { uploadFile } from "@/service/uploadFile";
import { saveConfig } from "@/service/saveConfig";
import { deleteIcons } from "@/service/deleteIcons";

const service = {
  getIcons,
  generateIcon,
  uploadFile,
  saveConfig,
  deleteIcons,
};
export default service;

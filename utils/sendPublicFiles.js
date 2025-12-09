import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getFileType } from "./getFileType.js";

export async function sendPublicFiles(req, res, dirname) {
  const publicPath = path.join(dirname, "public");
  const filePath = path.join(
    publicPath,
    req.url === "/" ? "index.html" : req.url,
  );
  const errorFilePath = path.join(publicPath, "404.html");
  const fileExt = path.extname(filePath);
  const fileType = getFileType(fileExt);

  try {
    const fileContent = await fs.readFile(filePath);
    sendResponse(res, 200, fileType, fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        const errorContent = await fs.readFile(errorFilePath);
        sendResponse(res, 404, "text/html", errorContent);
      } catch {
        sendResponse(res, 404, "text/html", "<h1>404 Not Found</h1>");
      }
    } else {
      sendResponse(res, 500, "text/html", "<h1>Internal server error</h1>");
    }
  }
}

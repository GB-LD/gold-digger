import http from "node:http";
import { sendPublicFiles } from "./utils/sendPublicFiles.js";

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    await sendPublicFiles(req, res, __dirname);
  }
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

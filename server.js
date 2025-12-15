import http from "node:http";
import { sendPublicFiles } from "./utils/sendPublicFiles.js";
import handleGoldPrice from "./handlers/handleGoldPrice.js";
import handleInvestRequest from "./handlers/handleInvestRequest.js";

const PORT = process.env.PORT || 8000;
const __dirname = import.meta.dirname;

const apiRoutesGetReq = {
  "/api/goldprice": handleGoldPrice,
};

const apiRoutesPostReq = {
  "/api/invest": handleInvestRequest,
};

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api")) {
    if (req.method === "GET" && apiRoutesGetReq[req.url]) {
      return await apiRoutesGetReq[req.url](res);
    }

    if (req.method === "POST" && apiRoutesPostReq[req.url]) {
      return await apiRoutesPostReq[req.url](req, res);
    }
  }

  if (req.method === "GET") {
    return await sendPublicFiles(req, res, __dirname);
  }

  res.statusCode = 405;
  res.end("Method Not Allowed");
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

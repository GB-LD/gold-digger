import http from "node:http";
import { sendPublicFiles } from "./utils/sendPublicFiles.js";
import { handleGoldPrice, handle404 } from "./handler/routeHandlers.js";

const PORT = 8000;
const __dirname = import.meta.dirname;

const apiRoutes = {
  "/api/goldprice": handleGoldPrice,
};

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && apiRoutes[req.url]) {
    return await apiRoutes[req.url](res);
  }

  if (req.method === "GET" && req.url.startsWith("/api")) {
    return await handle404(res, __dirname);
  }

  if (req.method === "GET") {
    return await sendPublicFiles(req, res, __dirname);
  }

  res.statusCode = 405;
  res.end("Methode Not Allowed");
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

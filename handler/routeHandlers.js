import fs from "node:fs/promises";
import path from "node:path";
import goldPrices from "../data/goldPrices.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handleGoldPrice(res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendPrice = () => {
    const randIndex = Math.floor(Math.random() * goldPrices.length);
    res.write(
      `data: ${JSON.stringify({ event: "price-updated", price: goldPrices[randIndex] })}\n\n`,
    );
  };

  const intervalID = setInterval(sendPrice, 2500);

  res.on("close", () => {
    (clearInterval(intervalID), res.end);
  });
}

export async function handle404(res, dirname) {
  const publicPath = path.join(dirname, "public");
  const errorFilePath = path.join(publicPath, "404.html");
  const errorContent = await fs.readFile(errorFilePath);
  sendResponse(res, 404, "text/html", errorContent);
}

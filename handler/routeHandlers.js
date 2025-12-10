import goldPrices from "../data/goldPrices.js";
import sendResponse from "../utils/sendResponse.js";
import parseJSONBody from "../utils/parseJSONBody.js";

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
    clearInterval(intervalID);
  });
}

export async function handleInvestRequest(req, res) {
  const parsedBody = await parseJSONBody(req);
  if (parsedBody) {
    sendResponse(res, 201, "application/json", JSON.stringify(parsedBody));
    console.log("I received an invest", parsedBody);
  }
}

import goldPrices from "../data/goldPrices.js";

export default async function handleGoldPrice(res) {
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

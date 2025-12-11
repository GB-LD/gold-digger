import parseJSONBody from "../utils/parseJSONBody.js";
import getGoldSoldValue from "../utils/getGoldSoldValue.js";
import saveLogTransaction from "../utils/saveLogTransaction.js";
import sendResponse from "../utils/sendResponse.js";

export default async function handleInvestRequest(req, res) {
  try {
    const { timeStamp, amount, goldPrice } = await parseJSONBody(req);

    if (timeStamp != null && amount != null && goldPrice != null) {
      const goldSoldValue = getGoldSoldValue(amount, goldPrice);
      const newTransaction = {
        timeStamp,
        amountPaid: "£ " + amount,
        pricePerOz: "£ " + goldPrice,
        goldSold: goldSoldValue + " oZ",
      };
      await saveLogTransaction(newTransaction);
      sendResponse(
        res,
        201,
        "application/json",
        JSON.stringify(newTransaction),
      );
    } else {
      sendResponse(
        res,
        400,
        "application/json",
        JSON.stringify("missing or invalid field"),
      );
    }
  } catch {
    sendResponse(
      res,
      500,
      "application/json",
      JSON.stringify("internal Server Error"),
    );
  }
}

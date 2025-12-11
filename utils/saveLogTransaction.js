import fs from "node:fs/promises";
import path from "node:path";

export default async function saveLogTransaction(newTransaction) {
  const transactionsLogPath = path.join(
    process.cwd(),
    "data",
    "transactionsLog.json",
  );

  try {
    let transactionsLogs = [];
    try {
      const data = await fs.readFile(transactionsLogPath, "utf-8");
      transactionsLogs = JSON.parse(data);
    } catch (readError) {
      if (readError.code !== "ENOENT") throw readError;
    }

    transactionsLogs.push(newTransaction);
    await fs.writeFile(
      transactionsLogPath,
      JSON.stringify(transactionsLogs, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.log("Transaction save failed: ", error);
    throw new Error("an error occurs durring the transaction saving process");
  }
}

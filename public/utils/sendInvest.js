export default async function sendInvest(amount, goldPrice) {
  const isoDate = new Date().toISOString();
  const formData = {
    timeStamp: isoDate,
    amount: amount,
    goldPrice: goldPrice,
  };

  try {
    const response = await fetch("/api/invest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const transaction = await response.json();
      console.log(transaction);
    }
  } catch (error) {
    console.log(error);
  }
}

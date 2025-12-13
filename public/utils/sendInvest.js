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
      const { amountPaid, goldSold } = await response.json();
      const successModal = document.getElementById("success-dialog");
      const successMessage = document.getElementById("investment-summary");
      const modalBtn = document.getElementById("success-btn")
      successMessage.textContent = `You just bought ${goldSold} (ozt) for ${amountPaid}. \n You will receive
          documentation shortly.`;
      successModal.showModal();
      modalBtn.addEventListener('click', () => successModal.close())
    }
  } catch (error) {
    console.log(error);
  }
}

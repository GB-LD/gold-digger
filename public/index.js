import isValidAmount from "./utils/isValidAmount.js";
import sendInvest from "./utils/sendInvest.js";

// stream gold price
let priceStramPause = false;
let actualGoldPrice = null;

const investForm = document.getElementById("invest-form");
const investBtn = document.getElementById("invest-btn");
const amountInput = document.getElementById("investment-amount");
const connectionStatus = document.getElementById("connection-status");
const priceSpan = document.getElementById("price-display");

const eventSource = new EventSource("/api/goldprice");

amountInput.disabled = true;

// get gold price stream
eventSource.onopen = () => (connectionStatus.textContent = "Live Price 🟢");

eventSource.onmessage = (event) => {
  if (priceStramPause) return;

  const data = JSON.parse(event.data);
  const price = data.price;
  actualGoldPrice = price;
  priceSpan.textContent = price;
  amountInput.disabled = false;
};

eventSource.onerror = (event) => {
  connectionStatus.textContent = "Disconnected 🔴​";
  amountInput.disabled = true;
  console.log(event, "connection failed");
};

// manage valid invest form
amountInput.addEventListener("input", (e) => {
  const amount = parseFloat(e.currentTarget.value);
  if (isValidAmount(amount) && actualGoldPrice !== null) {
    investBtn.disabled = false;
  } else {
    investBtn.disabled = true;
  }
});

// submit invest amount
investForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  priceStramPause = true;
  investBtn.disabled = true;

  const amount = parseFloat(amountInput.value);

  if (isValidAmount(amount) && actualGoldPrice !== null) {
    try {
      await sendInvest(amount, actualGoldPrice);
      priceStramPause = false;
      investBtn.disabled = false;
    } catch (error) {
      console.log(error);
    }
  }
});

const eventSource = new EventSource("/api/goldprice");

const connectionStatus = document.getElementById("connection-status");
const priceSpan = document.getElementById("price-display");

eventSource.onopen = () => (connectionStatus.textContent = "Live Price 🟢");

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const price = data.price;
  priceSpan.textContent = price;
};

eventSource.onerror = (event) => {
  connectionStatus.textContent = "Disconnected 🔴​";
  console.log(event, "connection failed");
};

export default function getGoldSoldValue(amount, goldPrice) {
  const goldValue = (amount / goldPrice).toFixed(3);
  return goldValue;
}

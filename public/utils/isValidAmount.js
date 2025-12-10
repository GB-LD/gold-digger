export default function isValidAmount(amount) {
  return !isNaN(amount) && amount > 0;
}

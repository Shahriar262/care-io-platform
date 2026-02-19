export const calculateCost = (price, quantity = 1, duration = 1) => {
  const total = Number(price) * Number(quantity) * Number(duration);
  return isNaN(total) ? 0 : total;
};

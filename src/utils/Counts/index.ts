export function isInStock(data: number) {
  return data > 0 ? true : false;
}
export function media(value: number, qty: number) {
  return value / qty;
}

export function belowMinimumStock(qty: number, threshold: number) {
  return qty < threshold;
}

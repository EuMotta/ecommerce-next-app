export function currencyConverter(amount: number) {
  if (isNaN(amount) || amount === null) {
    return 'NaN';
  }

  const formattedAmount = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formattedAmount;
}

export default currencyConverter;

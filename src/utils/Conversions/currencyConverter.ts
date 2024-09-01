export function currencyConverter(amount: number) {
  const formattedAmount = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formattedAmount;
}

export default currencyConverter;

function convertToSubCurrency(amount: number, currency: string): number {
  switch (currency) {
    case 'usd':
      return Math.round(amount * 100);
    case 'jpy':
      return Math.round(amount * 100);
    case 'eur':
      return Math.round(amount * 100);
    default:
      throw new Error('Unknown currency');
  }
}

export default convertToSubCurrency;
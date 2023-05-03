function formatCurrency (cost: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cost);
}
export default formatCurrency;
